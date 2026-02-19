import {
    cancelSubscriptionRouteDefinition,
    createFirstPaymentRouteDefinition,
    readOrganizationSubscriptionRouteDefinition
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCreditCard, IconX } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatDateTime } from "../../../../../../components/formats/formatDateTime.tsx"
import type { ChipColors } from "../../../../../../components/layouts/chip.tsx"
import { Chip } from "../../../../../../components/layouts/chip.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
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
                                                ? "Votre organisation bénéficie du plan Avancé."
                                                : "Votre organisation utilise le plan basique."
                                        }
                                    >
                                        <Chip
                                            text={subscription.isPremium ? "Avancé" : "Basique"}
                                            color={subscription.isPremium ? "success" : "neutral"}
                                        />
                                    </SettingsSection.Row>
                                    {!subscription.isPremium && (
                                        <SettingsSection.Row
                                            title="Passer au plan Avancé"
                                            description="30€ / mois — Accédez à toutes les fonctionnalités."
                                        >
                                            <Button onClick={handleSubscribe} hasLoader>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconCreditCard />}
                                                    text={isSubscribing ? "Redirection..." : "S'abonner"}
                                                />
                                            </Button>
                                        </SettingsSection.Row>
                                    )}
                                    {subscription.isPremium && subscription.subcriptionEndingAt && (
                                        <SettingsSection.Row
                                            title="Premium depuis"
                                            description="Date d'activation de l'abonnement Avancé."
                                        >
                                            <FormatDateTime date={subscription.subcriptionEndingAt} />
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
                                    {subscription.isPremium && (
                                        <SettingsSection.Row
                                            title="Annuler l'abonnement"
                                            description="Votre accès Premium sera révoqué immédiatement."
                                            variant="danger"
                                        >
                                            <CancelSubscription idOrganization={params.idOrganization} />
                                        </SettingsSection.Row>
                                    )}
                                </SettingsSection.Root>
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
