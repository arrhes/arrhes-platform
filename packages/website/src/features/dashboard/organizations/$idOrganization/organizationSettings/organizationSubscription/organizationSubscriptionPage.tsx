import {
    cancelSubscriptionRouteDefinition,
    createFirstPaymentRouteDefinition,
    readAllOrganizationPaymentsRouteDefinition,
    readOrganizationSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCreditCard, IconReceipt, IconX } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatDateTime } from "../../../../../../components/formats/formatDateTime.tsx"
import { FormatPrice } from "../../../../../../components/formats/formatPrice.tsx"
import type { ChipColors } from "../../../../../../components/layouts/chip.tsx"
import { Chip } from "../../../../../../components/layouts/chip.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../../components/layouts/emptyState.tsx"
import { ListTable } from "../../../../../../components/layouts/listTable/listTable.tsx"
import { Page } from "../../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { DeleteConfirmation } from "../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { organizationSubscriptionRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSubscription/organizationSubscriptionRoute.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

const statusLabel: Record<string, string> = {
    pending: "En attente",
    paid: "Payé",
    failed: "Échoué",
    refunded: "Remboursé",
}

const statusColor: Record<string, ChipColors> = {
    pending: "warning",
    paid: "success",
    failed: "error",
    refunded: "neutral",
}

export function OrganizationSubscriptionPage() {
    const params = useParams({ from: organizationSubscriptionRoute.id })
    const [isSubscribing, setIsSubscribing] = useState(false)

    async function handleSubscribe() {
        setIsSubscribing(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: createFirstPaymentRouteDefinition,
            body: {
                idOrganization: params.idOrganization,
            },
        })

        if (response.ok === false) {
            toast({ title: "Erreur lors de la création du paiement", variant: "error" })
            setIsSubscribing(false)
            return
        }

        window.location.href = response.data.checkoutUrl
    }

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOrganizationSubscriptionRouteDefinition}
                    body={{
                        idOrganization: params.idOrganization,
                    }}
                >
                    {(subscription) => {
                        return (
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                })}
                            >
                                <SettingsSection.Root>
                                    <SettingsSection.Header title="Abonnement" />
                                    <SettingsSection.Row
                                        title="Statut"
                                        description={
                                            subscription.isPremium
                                                ? "Votre organisation bénéficie de l'abonnement Premium."
                                                : "Votre organisation utilise le plan gratuit."
                                        }
                                    >
                                        <Chip
                                            text={subscription.isPremium ? "Premium" : "Gratuit"}
                                            color={subscription.isPremium ? "success" : "neutral"}
                                        />
                                    </SettingsSection.Row>
                                    {subscription.isPremium && subscription.premiumAt && (
                                        <SettingsSection.Row
                                            title="Premium depuis"
                                            description="Date d'activation de l'abonnement Premium."
                                        >
                                            <FormatDateTime date={subscription.premiumAt} />
                                        </SettingsSection.Row>
                                    )}
                                    {subscription.status && (
                                        <SettingsSection.Row
                                            title="Dernier paiement"
                                            description="Statut du dernier paiement enregistré."
                                        >
                                            <Chip
                                                text={statusLabel[subscription.status] ?? subscription.status}
                                                color={statusColor[subscription.status] ?? "neutral"}
                                            />
                                        </SettingsSection.Row>
                                    )}
                                </SettingsSection.Root>

                                {!subscription.isPremium && (
                                    <SettingsSection.Root>
                                        <SettingsSection.Header title="S'abonner" />
                                        <SettingsSection.Row
                                            title="Passer à Premium"
                                            description="9,99 € / mois — Accédez à toutes les fonctionnalités."
                                        >
                                            <Button onClick={handleSubscribe} hasLoader>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconCreditCard />}
                                                    text={isSubscribing ? "Redirection..." : "S'abonner"}
                                                />
                                            </Button>
                                        </SettingsSection.Row>
                                    </SettingsSection.Root>
                                )}

                                {subscription.isPremium && (
                                    <SettingsSection.Root variant="danger">
                                        <SettingsSection.Header title="Zone de danger" variant="danger" />
                                        <SettingsSection.Row
                                            title="Annuler l'abonnement"
                                            description="Votre accès Premium sera révoqué immédiatement."
                                            variant="danger"
                                        >
                                            <CancelSubscription idOrganization={params.idOrganization} />
                                        </SettingsSection.Row>
                                    </SettingsSection.Root>
                                )}

                                <SettingsSection.Root>
                                    <SettingsSection.Header title="Historique des paiements" />
                                </SettingsSection.Root>
                                <DataWrapper
                                    routeDefinition={readAllOrganizationPaymentsRouteDefinition}
                                    body={{
                                        idOrganization: params.idOrganization,
                                    }}
                                >
                                    {(payments) => {
                                        if (payments.length === 0) {
                                            return (
                                                <EmptyState
                                                    icon={<IconReceipt size={48} />}
                                                    title="Aucun paiement"
                                                    subtitle="Les paiements apparaîtront ici une fois votre premier abonnement effectué."
                                                />
                                            )
                                        }

                                        return (
                                            <ListTable.Root>
                                                {payments.map((payment) => (
                                                    <ListTable.Row key={payment.id}>
                                                        <div
                                                            className={css({
                                                                width: "100%",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                gap: "0.5rem",
                                                            })}
                                                        >
                                                            <div
                                                                className={css({
                                                                    width: "100%",
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "start",
                                                                    gap: "1rem",
                                                                })}
                                                            >
                                                                <div
                                                                    className={css({
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "0.75rem",
                                                                    })}
                                                                >
                                                                    <span
                                                                        className={css({
                                                                            fontSize: "sm",
                                                                            fontWeight: "medium",
                                                                        })}
                                                                    >
                                                                        {payment.description ?? "Paiement"}
                                                                    </span>
                                                                    <Chip
                                                                        text={
                                                                            statusLabel[payment.status] ??
                                                                            payment.status
                                                                        }
                                                                        color={statusColor[payment.status] ?? "neutral"}
                                                                    />
                                                                </div>
                                                                <FormatPrice price={payment.amountInCents / 100} />
                                                            </div>
                                                            <div
                                                                className={css({
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "0.5rem",
                                                                    flexWrap: "wrap",
                                                                })}
                                                            >
                                                                <span
                                                                    className={css({
                                                                        fontSize: "xs",
                                                                        color: "neutral/50",
                                                                    })}
                                                                >
                                                                    <FormatDateTime date={payment.createdAt} />
                                                                </span>
                                                                {payment.sequenceType && (
                                                                    <Chip
                                                                        text={
                                                                            payment.sequenceType === "first"
                                                                                ? "Premier paiement"
                                                                                : "Récurrent"
                                                                        }
                                                                        color="information"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </ListTable.Row>
                                                ))}
                                            </ListTable.Root>
                                        )
                                    }}
                                </DataWrapper>
                            </div>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}

function CancelSubscription(props: { idOrganization: string }) {
    return (
        <DeleteConfirmation
            title="Voulez-vous annuler votre abonnement ?"
            description={
                <>
                    Votre accès Premium sera révoqué immédiatement.
                    <br />
                    Vous pourrez vous réabonner à tout moment.
                </>
            }
            submitText="Annuler l'abonnement"
            onSubmit={async () => {
                const response = await getResponseBodyFromAPI({
                    routeDefinition: cancelSubscriptionRouteDefinition,
                    body: {
                        idOrganization: props.idOrganization,
                    },
                })

                if (response.ok === false) {
                    toast({ title: "Erreur lors de l'annulation de l'abonnement", variant: "error" })
                    return
                }

                await invalidateData({
                    routeDefinition: readOrganizationSubscriptionRouteDefinition,
                    body: {
                        idOrganization: props.idOrganization,
                    },
                })

                toast({ title: "Abonnement annulé", variant: "success" })
            }}
        >
            <ButtonOutlineContent leftIcon={<IconX />} text="Annuler l'abonnement" color="danger" />
        </DeleteConfirmation>
    )
}
