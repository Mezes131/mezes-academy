import { corsHeaders } from "../_shared/cors.ts";
import { sendTransactionalEmail } from "../_shared/org-helpers.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json() as {
      company_name?: string;
      email?: string;
      seat_count?: number;
      message?: string;
    };

    const companyName = body.company_name?.trim();
    const email = body.email?.trim();
    const seatCount = Number(body.seat_count ?? 0);
    const message = body.message?.trim() ?? "";

    if (!companyName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid company or email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (seatCount < 10) {
      return new Response(JSON.stringify({ error: "Quote requests require at least 10 seats" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminEmail = Deno.env.get("ENTERPRISE_QUOTE_EMAIL") ?? "contact@mezescorp.com";
    const subject = `Enterprise quote — ${companyName} (${seatCount} seats)`;
    const html = `
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Seats:</strong> ${seatCount}</p>
      <p><strong>Message:</strong></p>
      <p>${message || "(none)"}</p>
    `;

    await sendTransactionalEmail(adminEmail, subject, html);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
