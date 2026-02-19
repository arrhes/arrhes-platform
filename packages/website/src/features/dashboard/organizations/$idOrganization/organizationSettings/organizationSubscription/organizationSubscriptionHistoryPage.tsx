import {
    createFirstPaymentRouteDefinition,
    readAllOrganizationPaymentsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconReceipt } from "@tabler/icons-react"
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
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { organizationSubscriptionHistoryRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSettings/organizationSubscription/organizationSubscriptionHistoryRoute.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"

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

export function OrganizationSubscriptionHistoryPage() {
    const params = useParams({ from: organizationSubscriptionHistoryRoute.id })
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
                <SettingsSection.Root>
                    <SettingsSection.Header title="Historique des paiements" />
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
                                        subtitle="Les paiements apparaîtront ici une fois votre premier abonnement souscrit."
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
                                                            {`Paiement du ${payment.periodStart} au ${payment.periodEnd}`}
                                                        </span>
                                                        <Chip
                                                            text={statusLabel[payment.status] ?? payment.status}
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
                                                    {/* {payment.sequenceType && (
                                                    <Chip
                                                        text={
                                                            payment.sequenceType === "first"
                                                                ? "Premier paiement"
                                                                : "Récurrent"
                                                        }
                                                        color="information"
                                                    />
                                                )} */}
                                                </div>
                                            </div>
                                        </ListTable.Row>
                                    ))}
                                </ListTable.Root>
                            )
                        }}
                    </DataWrapper>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
