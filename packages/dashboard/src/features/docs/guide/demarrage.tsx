import { DocExample } from "../../../components/document/docExample.tsx";
import { DocLink } from "../../../components/document/docLink.tsx";
import { DocList } from "../../../components/document/docList.tsx";
import { DocNextPage } from "../../../components/document/docNextPage.tsx";
import { DocParagraph } from "../../../components/document/docParagraph.tsx";
import { DocSection } from "../../../components/document/docSection.tsx";


export function GuideDemarrage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Demarrer avec Arrhes</h1>
            <p className="text-neutral/50 mb-8">Premiers pas pour configurer votre comptabilite</p>

            <DocSection title="Creer un compte">
                <DocParagraph>
                    Pour commencer a utiliser Arrhes, vous devez d'abord creer un compte utilisateur.
                    Rendez-vous sur la page d'inscription et renseignez votre adresse email et un mot de passe.
                </DocParagraph>
                <DocParagraph>
                    Un email de confirmation vous sera envoye. Cliquez sur le lien pour activer votre compte.
                </DocParagraph>
            </DocSection>

            <DocSection title="Creer votre premiere organisation">
                <DocParagraph>
                    Une fois connecte, vous arrivez sur la page d'accueil. Si c'est votre premiere connexion,
                    vous serez invite a creer une organisation.
                </DocParagraph>
                <DocList items={[
                    "Cliquez sur Ajouter une organisation",
                    "Choisissez le type : Entreprise ou Association",
                    "Renseignez le nom de votre organisation",
                    "Si c'est une entreprise, indiquez le numero SIREN (optionnel)"
                ]} />
                <DocParagraph>
                    Vous pouvez gerer plusieurs organisations depuis le meme compte.
                    Pratique si vous gerez une entreprise et une association !
                </DocParagraph>
            </DocSection>

            <DocSection title="Creer un exercice comptable">
                <DocParagraph>
                    Apres avoir cree votre organisation, vous devez definir un exercice comptable.
                    L'exercice correspond generalement a l'annee civile (du 1er janvier au 31 decembre),
                    mais vous pouvez choisir d'autres dates.
                </DocParagraph>
                <DocExample title="Creer un exercice">
                    <ol className="space-y-2">
                        <li>1. Accedez a votre organisation</li>
                        <li>2. Cliquez sur Ajouter un exercice</li>
                        <li>3. Donnez un nom a l'exercice (ex : Exercice 2024)</li>
                        <li>4. Definissez les dates de debut et de fin</li>
                        <li>5. Validez</li>
                    </ol>
                </DocExample>
                <DocParagraph>
                    Le logiciel creera automatiquement un plan comptable adapte a votre type d'organisation.
                    Vous pourrez le personnaliser par la suite si necessaire.
                </DocParagraph>
            </DocSection>

            <DocSection title="Comprendre l'interface">
                <DocParagraph>
                    L'interface d'Arrhes est organisee autour de plusieurs sections :
                </DocParagraph>
                <DocList items={[
                    "Ecritures : pour saisir et consulter les operations comptables",
                    "Pieces jointes : pour gerer les justificatifs (factures, releves...)",
                    "Rapports : pour generer les documents de synthese",
                    "Parametres : pour configurer le plan comptable, les journaux..."
                ]} />
                <DocParagraph>
                    La navigation se fait via le menu lateral. Chaque section est accessible
                    en un clic depuis n'importe quelle page.
                </DocParagraph>
            </DocSection>

            <DocSection title="Prerequis comptables">
                <DocParagraph>
                    Avant de commencer la saisie, assurez-vous de comprendre les bases de la comptabilite.
                    Si vous n'avez jamais fait de comptabilite, nous vous recommandons de lire notre{" "}
                    <DocLink to="/docs/comptabilite/introduction">cours d'introduction</DocLink>.
                </DocParagraph>
                <DocParagraph>
                    Les concepts cles a maitriser sont :
                </DocParagraph>
                <DocList items={[
                    "La partie double (debit = credit)",
                    "Les classes de comptes (1 a 7)",
                    "La difference entre bilan et compte de resultat"
                ]} />
            </DocSection>

            <DocNextPage
                to="/docs/guide/organisations"
                label="Gerer les organisations"
            />
        </div>
    )
}
