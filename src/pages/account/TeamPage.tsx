import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  acceptOrgInvite,
  inviteOrgMember,
  removeOrgMember,
  useOrganization,
} from "@/hooks/useOrganization";
import { useLocalePath } from "@/i18n/useLocalePath";
import { useT } from "@/i18n/useT";

export function TeamPage() {
  const t = useT();
  const lp = useLocalePath();
  const [searchParams, setSearchParams] = useSearchParams();
  const { organization, loading, error, reload } = useOrganization();
  const [inviteEmail, setInviteEmail] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  useEffect(() => {
    const inviteId = searchParams.get("invite");
    if (!inviteId) return;
    const pendingInviteId = inviteId;

    async function accept() {
      const result = await acceptOrgInvite(pendingInviteId);
      if (result.error) {
        setActionError(result.error);
      } else {
        await reload();
      }
      const params = new URLSearchParams(searchParams);
      params.delete("invite");
      setSearchParams(params, { replace: true });
    }

    void accept();
  }, [searchParams, setSearchParams, reload]);

  async function onInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!organization) return;

    setActionError(null);
    setInviteSuccess(false);
    const result = await inviteOrgMember(organization.id, inviteEmail.trim());
    if (result.error) {
      setActionError(result.error);
      return;
    }

    setInviteEmail("");
    setInviteSuccess(true);
    await reload();
  }

  async function onRemove(memberId: string) {
    if (!window.confirm(t("billing.team.removeConfirm"))) return;
    setActionError(null);
    const result = await removeOrgMember(memberId);
    if (result.error) {
      setActionError(result.error);
      return;
    }
    await reload();
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="h-40 animate-pulse rounded-2xl border border-white/10 bg-bg-2" />
      </div>
    );
  }

  if (error || !organization) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-fg-2">{t("billing.team.noAccess")}</p>
        <Link to={lp("/pricing")} className="mt-4 inline-block text-accent-2 underline">
          {t("billing.paywall.ctaPricing")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-fg">
        {t("billing.team.title")}
      </h1>
      <p className="mt-2 text-fg-2">
        {t("billing.team.subtitle", { name: organization.name })}
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-bg-2 p-6">
        <p className="text-sm text-fg-2">
          {t("billing.team.seatsUsed", {
            used: organization.seatsUsed,
            limit: organization.seatLimit,
          })}
        </p>

        <ul className="mt-6 divide-y divide-white/5">
          {organization.members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between gap-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-fg">
                  {member.inviteEmail ??
                    t("billing.team.memberUser", {
                      id: member.userId?.slice(0, 8) ?? "—",
                    })}
                </p>
                <p className="text-[12px] text-fg-2">
                  {member.acceptedAt
                    ? t("billing.team.statusActive")
                    : t("billing.team.statusPending")}
                  {" · "}
                  {member.role === "admin"
                    ? t("billing.team.roleAdmin")
                    : t("billing.team.roleMember")}
                </p>
              </div>
              {organization.isAdmin &&
                member.role !== "admin" &&
                member.acceptedAt && (
                  <Button
                    variant="ghost"
                    className="text-red-400"
                    onClick={() => onRemove(member.id)}
                  >
                    {t("billing.team.remove")}
                  </Button>
                )}
            </li>
          ))}
        </ul>

        {organization.isAdmin && organization.seatsUsed < organization.seatLimit && (
          <form onSubmit={onInvite} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              className="min-h-10 flex-1 rounded-lg border border-white/10 bg-bg-3 px-3 text-sm"
              placeholder={t("billing.team.inviteEmail")}
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />
            <Button type="submit">{t("billing.team.invite")}</Button>
          </form>
        )}

        {inviteSuccess && (
          <p className="mt-3 text-sm text-emerald-300">{t("billing.team.inviteSent")}</p>
        )}
        {actionError && <p className="mt-3 text-sm text-red-400">{actionError}</p>}
      </div>

      <Link
        to={lp("/account?tab=billing")}
        className="mt-6 inline-block text-sm text-accent-2 underline"
      >
        {t("billing.team.backBilling")}
      </Link>
    </div>
  );
}
