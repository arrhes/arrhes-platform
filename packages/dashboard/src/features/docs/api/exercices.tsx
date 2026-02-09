import { Badge } from "@arrhes/ui"
import { css } from "../../../utilities/cn.js"


export function ApiExercices() {
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
                        Exercices
                    </h1>
                    <Badge>En développement</Badge>
                </div>
                <p className={css({
                    color: "neutral/60",
                    fontSize: "md",
                    lineHeight: "relaxed",
                })}>
                    Endpoints pour gérer les exercices comptables.
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
                    path="/v1/organisations/:orgId/fiscal-years"
                    description="Liste tous les exercices d'une organisation."
                    response={`{
  "data": [
    {
      "id": "fy_2024",
      "name": "Exercice 2024",
      "startDate": "2024-01-01",
      "endDate": "2024-12-31",
      "status": "open",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "fy_2023",
      "name": "Exercice 2023",
      "startDate": "2023-01-01",
      "endDate": "2023-12-31",
      "status": "closed",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ]
}`}
                />

                <Endpoint
                    method="GET"
                    path="/v1/organisations/:orgId/fiscal-years/:id"
                    description="Récupère les détails d'un exercice spécifique."
                    response={`{
  "data": {
    "id": "fy_2024",
    "name": "Exercice 2024",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "status": "open",
    "stats": {
      "recordsCount": 1234,
      "totalDebit": 150000.00,
      "totalCredit": 150000.00
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
}`}
                />

                <Endpoint
                    method="POST"
                    path="/v1/organisations/:orgId/fiscal-years"
                    description="Crée un nouvel exercice comptable."
                    request={`{
  "name": "Exercice 2025",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31"
}`}
                    response={`{
  "data": {
    "id": "fy_2025",
    "name": "Exercice 2025",
    "startDate": "2025-01-01",
    "endDate": "2025-12-31",
    "status": "open",
    "createdAt": "2025-01-01T10:00:00Z"
  }
}`}
                />

                <Endpoint
                    method="POST"
                    path="/v1/organisations/:orgId/fiscal-years/:id/close"
                    description="Clôture un exercice. Cette action verrouille toutes les écritures."
                    response={`{
  "data": {
    "id": "fy_2024",
    "status": "closed",
    "closedAt": "2025-01-15T10:00:00Z"
  }
}`}
                />

                <Endpoint
                    method="POST"
                    path="/v1/organisations/:orgId/fiscal-years/:id/reopen"
                    description="Réouvre un exercice clôturé. Nécessite des permissions administrateur."
                    response={`{
  "data": {
    "id": "fy_2024",
    "status": "open",
    "reopenedAt": "2025-01-16T10:00:00Z"
  }
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
