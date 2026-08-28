import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export interface OrgMember {
  id: string;
  userId: string | null;
  inviteEmail: string | null;
  role: "admin" | "member";
  acceptedAt: string | null;
  invitedAt: string;
}

export interface OrganizationSummary {
  id: string;
  name: string;
  seatLimit: number;
  seatsUsed: number;
  isAdmin: boolean;
  members: OrgMember[];
}

export function useOrganization() {
  const { user } = useAuth();
  const [organization, setOrganization] = useState<OrganizationSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!user || !isSupabaseConfigured || !supabase) {
      setOrganization(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: membership, error: memberError } = await supabase
        .from("organization_members")
        .select(
          "id, role, accepted_at, organization_id, organizations(id, name, seat_limit, owner_id)",
        )
        .eq("user_id", user.id)
        .not("accepted_at", "is", null)
        .limit(1)
        .maybeSingle();

      if (memberError) throw memberError;

      const orgRaw = membership?.organizations;
      const orgRow = (Array.isArray(orgRaw) ? orgRaw[0] : orgRaw) as {
        id: string;
        name: string;
        seat_limit: number;
        owner_id: string;
      } | null | undefined;

      if (!orgRow) {
        setOrganization(null);
        return;
      }

      const { data: members, error: membersError } = await supabase
        .from("organization_members")
        .select("id, user_id, invite_email, role, accepted_at, invited_at")
        .eq("organization_id", orgRow.id)
        .order("invited_at", { ascending: true });

      if (membersError) throw membersError;

      setOrganization({
        id: orgRow.id,
        name: orgRow.name,
        seatLimit: orgRow.seat_limit,
        seatsUsed: members?.length ?? 0,
        isAdmin: membership?.role === "admin",
        members: (members ?? []).map((row) => ({
          id: row.id,
          userId: row.user_id,
          inviteEmail: row.invite_email,
          role: row.role as "admin" | "member",
          acceptedAt: row.accepted_at,
          invitedAt: row.invited_at,
        })),
      });
    } catch {
      setError("billing.errors.loadFailed");
      setOrganization(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { organization, loading, error, reload };
}

async function callTeamFunction(
  path: string,
  body: Record<string, string>,
): Promise<{ ok?: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { error: "billing.errors.notConfigured" };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) return { error: "billing.errors.authRequired" };

  const base = import.meta.env.VITE_SUPABASE_URL;
  const res = await fetch(
    `${String(base).replace(/\/$/, "")}/functions/v1/${path}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    return { error: data.error ?? "Request failed" };
  }

  return { ok: true };
}

export async function inviteOrgMember(organizationId: string, email: string) {
  return callTeamFunction("invite-org-member", {
    organization_id: organizationId,
    email,
  });
}

export async function acceptOrgInvite(inviteId: string) {
  return callTeamFunction("accept-org-invite", { invite_id: inviteId });
}

export async function removeOrgMember(memberId: string) {
  return callTeamFunction("remove-org-member", { member_id: memberId });
}

export async function submitEnterpriseQuote(params: {
  companyName: string;
  email: string;
  seatCount: number;
  message: string;
}) {
  const base = import.meta.env.VITE_SUPABASE_URL;
  const res = await fetch(
    `${String(base).replace(/\/$/, "")}/functions/v1/enterprise-quote-request`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_name: params.companyName,
        email: params.email,
        seat_count: params.seatCount,
        message: params.message,
      }),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    return { error: data.error ?? "Request failed" };
  }

  return { ok: true as const };
}
