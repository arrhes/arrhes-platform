import { Badge } from "@arrhes/ui"
import { css } from "../../../utilities/cn.js"


export function ApiEcritures() {
    return (
        <div className={css({
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
        })}>
            {/* Page header */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
            })}>
                <div className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                })}>
                    <h1 className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}>
                        Écritures
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Endpoints pour créer et gérer les écritures comptables.
                </p>
            </div>

            {/* Content */}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            })}>
                <Endpoint
                    method="GET"
                    path="/v1/organisations/:orgId/records"
                    description="Liste les écritures comptables avec pagination et filtres."
                    response={`{
  "data": [
    {
      "id": "rec_abc123",
      "date": "2024-06-15",
      "description": "Achat fournitures",
      "journal": "ACH",
      "lines": [
        {
          "accountCode": "606100",
          "label": "Fournitures de bureau",
          "debit": 100.00,
          "credit": 0
        },
        {
          "accountCode": "401000",
          "label": "Fournisseurs",
          "debit": 0,
          "credit": 100.00
        }
      ],
      "createdAt": "2024-06-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "perPage": 20
  }
}`}
                />

                <div className={css({
                    padding: "1rem",
                    borderRadius: "md",
                    backgroundColor: "neutral/5",
                    fontSize: "sm",
                    color: "neutral/70",
                })}>
                    <strong>Paramètres de requête disponibles :</strong>
                    <ul className={css({ marginTop: "0.5rem", marginBottom: 0, paddingLeft: "1.5rem" })}>
                        <li><code>fiscalYearId</code> - Filtrer par exercice</li>
                        <li><code>journal</code> - Filtrer par journal (ACH, VTE, BQ, OD)</li>
                        <li><code>dateFrom</code> - Date de début (YYYY-MM-DD)</li>
                        <li><code>dateTo</code> - Date de fin (YYYY-MM-DD)</li>
                        <li><code>accountCode</code> - Filtrer par compte</li>
                        <li><code>page</code> - Numéro de page</li>
                        <li><code>perPage</code> - Nombre d'éléments par page (max 100)</li>
                    </ul>
                </div>

                <Endpoint
                    method="GET"
                    path="/v1/organisations/:orgId/records/:id"
                    description="Récupère les détails d'une écriture spécifique."
                    response={`{
  "data": {
    "id": "rec_abc123",
    "date": "2024-06-15",
    "description": "Achat fournitures",
    "journal": "ACH",
    "piece": "FAC-2024-001",
    "lines": [
      {
        "accountCode": "606100",
        "accountName": "Fournitures non stockables",
        "label": "Fournitures de bureau",
        "debit": 100.00,
        "credit": 0
      },
      {
        "accountCode": "401000",
        "accountName": "Fournisseurs",
        "label": "Fournisseurs",
        "debit": 0,
        "credit": 100.00
      }
    ],
    "attachments": [],
    "createdAt": "2024-06-15T10:00:00Z",
    "updatedAt": "2024-06-15T10:00:00Z"
  }
}`}
                />

                <Endpoint
                    method="POST"
                    path="/v1/organisations/:orgId/records"
                    description="Crée une nouvelle écriture comptable. L'écriture doit être équilibrée (total débit = total crédit)."
                    request={`{
  "fiscalYearId": "fy_2024",
  "date": "2024-06-20",
  "description": "Vente marchandises",
  "journal": "VTE",
  "piece": "FAC-2024-042",
  "lines": [
    {
      "accountCode": "411000",
      "label": "Client X",
      "debit": 1200.00,
      "credit": 0
    },
    {
      "accountCode": "707000",
      "label": "Vente marchandises",
      "debit": 0,
      "credit": 1000.00
    },
    {
      "accountCode": "445710",
      "label": "TVA collectée",
      "debit": 0,
      "credit": 200.00
    }
  ]
}`}
                    response={`{
  "data": {
    "id": "rec_xyz789",
    "date": "2024-06-20",
    ...
  }
}`}
                />

                <Endpoint
                    method="PATCH"
                    path="/v1/organisations/:orgId/records/:id"
                    description="Modifie une écriture existante. Non disponible si l'exercice est clôturé."
                    request={`{
  "description": "Vente marchandises - Client X"
}`}
                    response={`{
  "data": {
    "id": "rec_xyz789",
    ...
  }
}`}
                />

                <Endpoint
                    method="DELETE"
                    path="/v1/organisations/:orgId/records/:id"
                    description="Supprime une écriture. Non disponible si l'exercice est clôturé."
                    response={`{
  "success": true
}`}
                />
            </div>
        </div>
    )
}


function Endpoint(props: {
    method: "GET" | "POST" | "PATCH" | "DELETE"
    path: string
    description: string
    request?: string
    response: string
}) {
    const methodColors = {
        GET: { bg: "success/10", color: "success" },
        POST: { bg: "information/10", color: "information" },
        PATCH: { bg: "warning/10", color: "warning" },
        DELETE: { bg: "critical/10", color: "critical" }
    }
    const style = methodColors[props.method]

    return (
        <section className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            padding: "1.5rem",
            borderRadius: "lg",
            border: "1px solid",
            borderColor: "neutral/10",
            backgroundColor: "white",
        })}>
            <div className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
            })}>
                <span className={css({
                    padding: "0.25rem 0.5rem",
                    borderRadius: "sm",
                    fontSize: "xs",
                    fontWeight: "bold",
                    fontFamily: "mono",
                    backgroundColor: style.bg,
                    color: style.color,
                })}>
                    {props.method}
                </span>
                <code className={css({
                    fontSize: "sm",
                    fontFamily: "mono",
                    color: "neutral",
                })}>
                    {props.path}
                </code>
            </div>
            <p className={css({
                fontSize: "sm",
                color: "neutral/70",
                margin: 0,
            })}>
                {props.description}
            </p>
            {props.request && (
                <div className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}>
                    <span className={css({
                        fontSize: "xs",
                        fontWeight: "medium",
                        color: "neutral/50",
                        textTransform: "uppercase",
                    })}>
                        Requête
                    </span>
                    <pre className={css({
                        padding: "1rem",
                        borderRadius: "md",
                        backgroundColor: "neutral/5",
                        fontFamily: "mono",
                        fontSize: "xs",
                        color: "neutral",
                        overflowX: "auto",
                        margin: 0,
                    })}>
                        <code>{props.request}</code>
                    </pre>
                </div>
            )}
            <div className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            })}>
                <span className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    color: "neutral/50",
                    textTransform: "uppercase",
                })}>
                    Réponse
                </span>
                <pre className={css({
                    padding: "1rem",
                    borderRadius: "md",
                    backgroundColor: "neutral/5",
                    fontFamily: "mono",
                    fontSize: "xs",
                    color: "neutral",
                    overflowX: "auto",
                    margin: 0,
                })}>
                    <code>{props.response}</code>
                </pre>
            </div>
        </section>
    )
}
