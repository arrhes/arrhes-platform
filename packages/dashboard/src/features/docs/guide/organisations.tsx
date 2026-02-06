import { DocDefinition } from "../../../components/document/docDefinition.tsx";
import { DocExample } from "../../../components/document/docExample.tsx";
import { DocLink } from "../../../components/document/docLink.tsx";
import { DocList } from "../../../components/document/docList.tsx";
import { DocNextPage } from "../../../components/document/docNextPage.tsx";
import { DocParagraph } from "../../../components/document/docParagraph.tsx";
import { DocSection } from "../../../components/document/docSection.tsx";


export function GuideOrganisations() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Gerer les organisations</h1>
            <p className="text-neutral/50 mb-8">Configuration et administration de vos structures</p>

            <DocSection title="Types d'organisations">
                <DocParagraph>
                    Arrhes supporte deux types d'organisations, chacun avec un plan comptable adapte :
                </DocParagraph>
                <DocDefinition
                    term="Entreprise"
                    definition="Plan comptable general (PCG) adapte aux societes commerciales. Inclut les comptes de TVA, de capital social, etc."
                />
                <DocDefinition
                    term="Association"
                    definition="Plan comptable des associations. Inclut les comptes specifiques comme les cotisations (756), les subventions (74), les fonds associatifs..."
                />
                <DocParagraph>
                    Le type d'organisation est defini a la creation et ne peut pas etre modifie ensuite.
                    Si vous avez fait une erreur, vous devrez creer une nouvelle organisation.
                </DocParagraph>
            </DocSection>

            <DocSection title="Parametres de l'organisation">
                <DocParagraph>
                    Chaque organisation possede des parametres que vous pouvez modifier :
                </DocParagraph>
                <DocList items={[
                    "Nom : le nom affiche dans l'interface",
                    "SIREN : le numero d'identification (pour les entreprises)",
                    "Email de contact : pour les notifications et rapports"
                ]} />
                <DocExample title="Modifier les parametres">
                    <ol className="space-y-1">
                        <li>1. Accedez a votre organisation</li>
                        <li>2. Cliquez sur l'onglet Parametres</li>
                        <li>3. Modifiez les informations souhaitees</li>
                        <li>4. Enregistrez les modifications</li>
                    </ol>
                </DocExample>
            </DocSection>

            <DocSection title="Gestion des membres">
                <DocParagraph>
                    Vous pouvez inviter d'autres personnes a acceder a votre organisation.
                    Chaque membre peut avoir des droits differents.
                </DocParagraph>
                <DocDefinition
                    term="Administrateur"
                    definition="Acces complet : peut modifier les parametres, inviter des membres, supprimer l'organisation."
                />
                <DocDefinition
                    term="Membre"
                    definition="Acces limite : peut saisir des ecritures et consulter les rapports, mais ne peut pas modifier les parametres."
                />
                <DocExample title="Inviter un membre">
                    <ol className="space-y-1">
                        <li>1. Allez dans Parametres - Membres</li>
                        <li>2. Cliquez sur Inviter un membre</li>
                        <li>3. Entrez l'adresse email de la personne</li>
                        <li>4. Choisissez son role (Administrateur ou Membre)</li>
                        <li>5. Envoyez l'invitation</li>
                    </ol>
                    <p className="mt-2">La personne recevra un email avec un lien pour rejoindre l'organisation.</p>
                </DocExample>
            </DocSection>

            <DocSection title="Les exercices comptables">
                <DocParagraph>
                    Chaque organisation contient un ou plusieurs exercices comptables.
                    Un exercice represente une periode (generalement 12 mois) pendant laquelle
                    vous enregistrez vos operations.
                </DocParagraph>
                <DocParagraph>
                    Pour comprendre ce qu'est un exercice comptable, consultez la page sur les{" "}
                    <DocLink to="/docs/comptabilite/introduction">principes fondamentaux</DocLink>.
                </DocParagraph>
                <DocList items={[
                    "Vous ne pouvez avoir qu'un seul exercice en cours a la fois",
                    "Les exercices clotures ne peuvent plus etre modifies",
                    "A la cloture, le resultat est reporte dans l'exercice suivant"
                ]} />
            </DocSection>

            <DocSection title="Configuration du plan comptable">
                <DocParagraph>
                    Le plan comptable est la liste des comptes disponibles pour saisir vos ecritures.
                    Arrhes cree automatiquement un plan comptable standard, mais vous pouvez le personnaliser.
                </DocParagraph>
                <DocExample title="Ajouter un compte">
                    <ol className="space-y-1">
                        <li>1. Accedez a l'exercice concerne</li>
                        <li>2. Allez dans Parametres - Comptes</li>
                        <li>3. Cliquez sur Ajouter un compte</li>
                        <li>4. Definissez le numero et l'intitule du compte</li>
                        <li>5. Enregistrez</li>
                    </ol>
                    <p className="mt-2">
                        Pour comprendre la numerotation des comptes, consultez la page sur les{" "}
                        <DocLink to="/docs/comptabilite/comptes">comptes comptables</DocLink>.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les journaux">
                <DocParagraph>
                    Les journaux permettent de classer vos ecritures par type d'operation.
                    Des journaux par defaut sont crees automatiquement (Achats, Ventes, Banque, Caisse, Operations diverses).
                </DocParagraph>
                <DocParagraph>
                    Vous pouvez creer des journaux supplementaires si necessaire (ex : un journal par compte bancaire
                    si vous en avez plusieurs).
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/docs/guide/ecritures"
                label="Saisir des ecritures"
            />
        </div>
    )
}
