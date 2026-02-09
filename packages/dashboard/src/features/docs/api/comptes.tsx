import { Badge } from "@arrhes/ui"
import { css } from "../../../utilities/cn.js"


export function ApiComptes() {
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
                        Comptes
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Endpoints pour gérer le plan comptable et consulter les soldes.
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
                    path="/v1/organisations/:orgId/accounts"
                    description="Liste tous les comptes du plan comptable."
                    response={`{
  "data": [
    {
      "code": "101000",
      "name": "Capital social",
      "class": 1,
      "type": "balance",
      "isCustom": false
    },
    {
      "code": "411000",
      "name": "Clients",
      "class": 4,
      "type": "balance",
      "isCustom": false
    },
    {
      "code": "411001",
      "name": "Client - Entreprise X",
      "class": 4,
      "type": "balance",
      "isCustom": true,
      "parentCode": "411000"
    }
  ]
}`}
                />

                <div className={css({
                    padding: "1rem",
                    borderRadius: "md",
                    backgroundColor: "neutral/5",
                    fontSize: "sm",
                    color: "neutral/70",
                })}>
                    <strong>Classes de comptes :</strong>
                    <ul className={css({ marginTop: "0.5rem", marginBottom: 0, paddingLeft: "1.5rem" })}>
                        <li>Classe 1 - Capitaux</li>
                        <li>Classe 2 - Immobilisations</li>
                        <li>Classe 3 - Stocks</li>
                        <li>Classe 4 - Tiers</li>
                        <li>Classe 5 - Financiers</li>
                        <li>Classe 6 - Charges</li>
                        <li>Classe 7 - Produits</li>
                    </ul>
                </div>

                <Endpoint
                    method="GET"
                    path="/v1/organisations/:orgId/accounts/:code"
                    description="Récupère les détails d'un compte et son solde."
                    response={`{
  "data": {
    "code": "411000",
    "name": "Clients",
    "class": 4,
    "type": "balance",
    "balance": {
      "debit": 25000.00,
      "credit": 18000.00,
      "solde": 7000.00,
      "sens": "debiteur"
    }
  }
}`}
                />

                <Endpoint
                    method="POST"
                    path="/v1/organisations/:orgId/accounts"
                    description="Crée un compte personnalisé (subdivision d'un compte existant)."
                    request={`{
  "code": "411002",
  "name": "Client - Entreprise Y",
  "parentCode": "411000"
}`}
                    response={`{
  "data": {
    "code": "411002",
    "name": "Client - Entreprise Y",
    "class": 4,
    "type": "balance",
    "isCustom": true,
    "parentCode": "411000"
  }
}`}
                />

                <Endpoint
                    method="PATCH"
                    path="/v1/organisations/:orgId/accounts/:code"
                    description="Modifie le libellé d'un compte personnalisé."
                    request={`{
  "name": "Client - Entreprise Y (nouveau nom)"
}`}
                    response={`{
  "data": {
    "code": "411002",
    "name": "Client - Entreprise Y (nouveau nom)",
    ...
  }
}`}
                />

                <Endpoint
                    method="GET"
                    path="/v1/organisations/:orgId/accounts/:code/movements"
                    description="Liste tous les mouvements d'un compte."
                    response={`{
  "data": [
    {
      "recordId": "rec_abc123",
      "date": "2024-06-15",
      "description": "Facture client",
      "debit": 1200.00,
      "credit": 0,
      "balance": 1200.00
    },
    {
      "recordId": "rec_def456",
      "date": "2024-06-20",
      "description": "Règlement client",
      "debit": 0,
      "credit": 1200.00,
      "balance": 0
    }
  ],
  "meta": {
    "total": 2,
    "page": 1,
    "perPage": 50
  }
}`}
                />

                <Endpoint
                    method="DELETE"
                    path="/v1/organisations/:orgId/accounts/:code"
                    description="Supprime un compte personnalisé. Impossible si des écritures sont associées."
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
