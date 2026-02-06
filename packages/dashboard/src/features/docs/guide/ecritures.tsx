import { DocExample } from "../../../components/document/docExample.tsx";
import { DocLink } from "../../../components/document/docLink.tsx";
import { DocList } from "../../../components/document/docList.tsx";
import { DocNextPage } from "../../../components/document/docNextPage.tsx";
import { DocParagraph } from "../../../components/document/docParagraph.tsx";
import { DocSection } from "../../../components/document/docSection.tsx";
import { DocTable } from "../../../components/document/docTable.tsx";


export function GuideEcritures() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Saisir des ecritures</h1>
            <p className="text-neutral/50 mb-8">Enregistrer vos operations comptables dans Arrhes</p>

            <DocSection title="Acceder a la saisie">
                <DocParagraph>
                    Pour saisir une ecriture, accedez a votre exercice comptable puis cliquez
                    sur l'onglet Ecritures. Vous verrez la liste des ecritures existantes
                    et un bouton pour en ajouter une nouvelle.
                </DocParagraph>
            </DocSection>

            <DocSection title="Creer une ecriture">
                <DocParagraph>
                    Chaque ecriture comptable necessite les informations suivantes :
                </DocParagraph>
                <DocList items={[
                    "Date : la date de l'operation (ne peut pas etre en dehors de l'exercice)",
                    "Journal : le type d'operation (Achats, Ventes, Banque...)",
                    "Libelle : une description claire de l'operation",
                    "Lignes : les comptes mouvementes avec leurs montants"
                ]} />

                <DocExample title="Etapes de saisie">
                    <ol className="space-y-2">
                        <li>1. Cliquez sur Nouvelle ecriture</li>
                        <li>2. Selectionnez le journal (ex : Banque)</li>
                        <li>3. Choisissez la date de l'operation</li>
                        <li>4. Entrez un libelle descriptif (ex : Achat fournitures Papeterie Martin)</li>
                        <li>5. Ajoutez les lignes d'ecriture (comptes et montants)</li>
                        <li>6. Verifiez que l'equilibre debit = credit est respecte</li>
                        <li>7. Enregistrez l'ecriture</li>
                    </ol>
                </DocExample>
            </DocSection>

            <DocSection title="Les lignes d'ecriture">
                <DocParagraph>
                    Chaque ligne d'ecriture correspond a un compte mouvemente.
                    Vous devez indiquer :
                </DocParagraph>
                <DocList items={[
                    "Le compte (vous pouvez le rechercher par numero ou par nom)",
                    "Le montant au debit OU au credit (jamais les deux)"
                ]} />
                <DocParagraph>
                    Rappel : comme explique dans le cours sur les{" "}
                    <DocLink to="/docs/comptabilite/ecritures">ecritures comptables</DocLink>,
                    le total des debits doit toujours etre egal au total des credits.
                </DocParagraph>

                <DocExample title="Ecriture de paiement fournisseur">
                    <p className="mb-2">Vous payez une facture de 500 euros par virement bancaire :</p>
                    <DocTable
                        headers={["Compte", "Debit", "Credit"]}
                        rows={[
                            ["401000 - Fournisseurs", "500,00", ""],
                            ["512000 - Banque", "", "500,00"],
                        ]}
                    />
                    <p className="mt-2 text-xs">
                        Explication : la dette fournisseur diminue (debit d'un compte de passif),
                        la banque diminue (credit d'un compte d'actif).
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Joindre un justificatif">
                <DocParagraph>
                    Chaque ecriture devrait etre justifiee par une piece (facture, releve bancaire, ticket...).
                    Arrhes vous permet de joindre des fichiers numeriques a vos ecritures.
                </DocParagraph>
                <DocList items={[
                    "Formats acceptes : PDF, images (JPG, PNG)",
                    "Taille maximale : 10 Mo par fichier",
                    "Vous pouvez joindre plusieurs fichiers a une meme ecriture"
                ]} />
                <DocExample title="Ajouter une piece jointe">
                    <ol className="space-y-1">
                        <li>1. Ouvrez l'ecriture concernee</li>
                        <li>2. Cliquez sur Ajouter une piece jointe</li>
                        <li>3. Selectionnez le fichier sur votre ordinateur</li>
                        <li>4. Le fichier est automatiquement associe a l'ecriture</li>
                    </ol>
                </DocExample>
            </DocSection>

            <DocSection title="Modifier ou supprimer une ecriture">
                <DocParagraph>
                    Vous pouvez modifier ou supprimer une ecriture tant que l'exercice n'est pas cloture.
                    Pour cela, ouvrez l'ecriture et utilisez les boutons correspondants.
                </DocParagraph>
                <DocParagraph>
                    <strong>Attention :</strong> en comptabilite, il est generalement preferable de
                    passer une ecriture de correction plutot que de supprimer une ecriture erronee.
                    Cela permet de garder une trace de l'erreur et de sa correction.
                </DocParagraph>
            </DocSection>

            <DocSection title="Rechercher des ecritures">
                <DocParagraph>
                    La liste des ecritures peut etre filtree et triee selon plusieurs criteres :
                </DocParagraph>
                <DocList items={[
                    "Par date (periode)",
                    "Par journal",
                    "Par compte",
                    "Par libelle (recherche textuelle)"
                ]} />
                <DocParagraph>
                    Utilisez les filtres en haut de la liste pour affiner votre recherche.
                </DocParagraph>
            </DocSection>

            <DocSection title="Conseils pratiques">
                <DocList items={[
                    "Saisissez vos ecritures regulierement (idealement chaque semaine) pour ne pas accumuler de retard",
                    "Utilisez des libelles clairs et coherents pour faciliter les recherches",
                    "Numerisez et joignez vos justificatifs au fur et a mesure",
                    "Verifiez regulierement vos soldes bancaires avec vos releves"
                ]} />
            </DocSection>

            <DocNextPage
                to="/docs/guide/rapports"
                label="Generer des rapports"
            />
        </div>
    )
}
