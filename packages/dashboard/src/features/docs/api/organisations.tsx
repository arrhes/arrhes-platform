import { Badge } from "@arrhes/ui"
import { css } from "../../../utilities/cn.js"


export function ApiOrganisations() {
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
                        Organisations
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Endpoints pour gérer les organisations et leurs paramètres.
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
                    path="/v1/organisations"
                    description="Liste toutes les organisations auxquelles vous avez accès."
                    response={`{
  "data": [
    {
      "id": "org_abc123",
      "name": "Mon Entreprise",
      "siren": "123456789",
      "createdAt": "2024-01-15T10:00:00Z",
      "fiscalYearStart": "01-01"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "perPage": 20
  }
}`}
                />

                <Endpoint
                    method="GET"
                    path="/v1/organisations/:id"
                    description="Récupère les détails d'une organisation spécifique."
                    response={`{
  "data": {
    "id": "org_abc123",
    "name": "Mon Entreprise",
    "siren": "123456789",
    "address": {
      "street": "1 rue de la Paix",
      "city": "Paris",
      "postalCode": "75001",
      "country": "FR"
    },
    "createdAt": "2024-01-15T10:00:00Z",
    "fiscalYearStart": "01-01"
  }
}`}
                />

                <Endpoint
                    method="POST"
                    path="/v1/organisations"
                    description="Crée une nouvelle organisation."
                    request={`{
  "name": "Nouvelle Entreprise",
  "siren": "987654321",
  "fiscalYearStart": "01-01"
}`}
                    response={`{
  "data": {
    "id": "org_xyz789",
    "name": "Nouvelle Entreprise",
    "siren": "987654321",
    "createdAt": "2024-06-01T14:30:00Z",
    "fiscalYearStart": "01-01"
  }
}`}
                />

                <Endpoint
                    method="PATCH"
                    path="/v1/organisations/:id"
                    description="Met à jour une organisation existante."
                    request={`{
  "name": "Entreprise Renommée"
}`}
                    response={`{
  "data": {
    "id": "org_abc123",
    "name": "Entreprise Renommée",
    ...
  }
}`}
                />

                <Endpoint
                    method="DELETE"
                    path="/v1/organisations/:id"
                    description="Supprime une organisation. Cette action est irréversible."
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
