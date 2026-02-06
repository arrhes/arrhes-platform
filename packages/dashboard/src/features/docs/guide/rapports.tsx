import { DocExample } from "../../../components/document/docExample.tsx";
import { DocList } from "../../../components/document/docList.tsx";
import { DocParagraph } from "../../../components/document/docParagraph.tsx";
import { DocSection } from "../../../components/document/docSection.tsx";
import { DocTable } from "../../../components/document/docTable.tsx";


export function GuideRapports() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Generer des rapports</h1>
            <p className="text-neutral/50 mb-8">Produire vos documents comptables et analyser vos donnees</p>

            <DocSection title="Les rapports disponibles">
                <DocParagraph>
                    Arrhes vous permet de generer les principaux documents comptables
                    necessaires a la gestion de votre entreprise et a vos obligations legales.
                </DocParagraph>
                <DocList items={[
                    "Grand livre : detail de tous les mouvements par compte",
                    "Balance : situation de chaque compte (soldes debiteurs et crediteurs)",
                    "Journal : liste chronologique de toutes les ecritures",
                    "Bilan : situation patrimoniale de l'entreprise (actif/passif)",
                    "Compte de resultat : synthese des produits et charges de l'exercice"
                ]} />
            </DocSection>

            <DocSection title="Acceder aux rapports">
                <DocParagraph>
                    Pour generer un rapport, accedez a votre exercice comptable puis cliquez
                    sur l'onglet Rapports. Selectionnez ensuite le type de document souhaite.
                </DocParagraph>
                <DocExample title="Generer une balance">
                    <ol className="space-y-1">
                        <li>1. Ouvrez l'exercice comptable concerne</li>
                        <li>2. Cliquez sur Rapports dans le menu</li>
                        <li>3. Selectionnez Balance</li>
                        <li>4. Choisissez la periode (optionnel)</li>
                        <li>5. Cliquez sur Generer</li>
                    </ol>
                </DocExample>
            </DocSection>

            <DocSection title="Le Grand livre">
                <DocParagraph>
                    Le grand livre presente le detail de tous les mouvements pour chaque compte.
                    C'est le document de reference pour verifier l'historique d'un compte.
                </DocParagraph>
                <DocList items={[
                    "Affiche chaque ecriture avec sa date, son libelle et son montant",
                    "Calcule le solde progressif apres chaque mouvement",
                    "Peut etre filtre par compte ou par periode",
                    "Utile pour pointer les ecarts et comprendre l'evolution d'un compte"
                ]} />
            </DocSection>

            <DocSection title="La Balance">
                <DocParagraph>
                    La balance presente la situation de chaque compte avec le total des debits,
                    le total des credits et le solde. Elle permet de verifier l'equilibre comptable.
                </DocParagraph>
                <DocExample title="Extrait de balance">
                    <DocTable
                        headers={["Compte", "Libelle", "Total Debit", "Total Credit", "Solde"]}
                        rows={[
                            ["411000", "Clients", "15 000,00", "12 000,00", "3 000,00 D"],
                            ["401000", "Fournisseurs", "8 000,00", "10 000,00", "2 000,00 C"],
                            ["512000", "Banque", "45 000,00", "38 000,00", "7 000,00 D"],
                        ]}
                    />
                </DocExample>
                <DocParagraph>
                    <strong>Verification :</strong> le total des soldes debiteurs doit toujours
                    etre egal au total des soldes crediteurs.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le Bilan">
                <DocParagraph>
                    Le bilan presente la situation patrimoniale de l'entreprise a une date donnee.
                    Il est structure en deux parties equilibrees :
                </DocParagraph>
                <DocList items={[
                    "L'actif : ce que l'entreprise possede (immobilisations, stocks, creances, tresorerie)",
                    "Le passif : les ressources de l'entreprise (capitaux propres, emprunts, dettes)"
                ]} />
                <DocParagraph>
                    Le bilan est generalement produit a la cloture de l'exercice pour les
                    comptes annuels, mais peut aussi etre genere a tout moment pour un suivi intermediaire.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le Compte de resultat">
                <DocParagraph>
                    Le compte de resultat presente les produits et les charges de l'exercice,
                    et calcule le resultat (benefice ou perte).
                </DocParagraph>
                <DocExample title="Structure simplifiee">
                    <DocTable
                        headers={["Element", "Montant"]}
                        rows={[
                            ["Chiffre d'affaires", "100 000,00"],
                            ["Achats et charges externes", "- 60 000,00"],
                            ["Charges de personnel", "- 25 000,00"],
                            ["Autres charges", "- 5 000,00"],
                            ["Resultat", "10 000,00"],
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Exporter les rapports">
                <DocParagraph>
                    Tous les rapports peuvent etre exportes dans plusieurs formats
                    pour etre archives ou transmis a votre expert-comptable.
                </DocParagraph>
                <DocList items={[
                    "PDF : format ideal pour l'archivage et l'impression",
                    "Excel (XLSX) : pour retravailler les donnees dans un tableur",
                    "CSV : format universel compatible avec tous les logiciels"
                ]} />
                <DocExample title="Exporter un rapport">
                    <ol className="space-y-1">
                        <li>1. Generez le rapport souhaite</li>
                        <li>2. Cliquez sur le bouton Exporter</li>
                        <li>3. Selectionnez le format (PDF, Excel, CSV)</li>
                        <li>4. Le fichier est telecharge sur votre ordinateur</li>
                    </ol>
                </DocExample>
            </DocSection>

            <DocSection title="Filtrer par periode">
                <DocParagraph>
                    La plupart des rapports peuvent etre filtres par periode pour analyser
                    une portion specifique de l'exercice (mois, trimestre...).
                </DocParagraph>
                <DocList items={[
                    "Selectionnez une date de debut et une date de fin",
                    "Les rapports n'incluront que les ecritures de cette periode",
                    "Utile pour les declarations periodiques (TVA mensuelle, trimestrielle...)"
                ]} />
            </DocSection>

            <DocSection title="Conseils pratiques">
                <DocList items={[
                    "Generez une balance chaque mois pour verifier la coherence de vos saisies",
                    "Comparez vos soldes bancaires avec vos releves pour detecter les ecarts",
                    "Archivez vos rapports PDF pour conserver une trace datee",
                    "Transmettez les exports a votre expert-comptable pour la revision annuelle"
                ]} />
            </DocSection>

            <div className="mt-12 p-6 rounded-lg bg-positive/10 border border-positive/20">
                <h3 className="font-semibold text-positive mb-2">Felicitations !</h3>
                <p className="text-sm text-neutral/80">
                    Vous avez termine le guide d'utilisation d'Arrhes. Vous maitrisez maintenant
                    les fonctionnalites essentielles pour gerer votre comptabilite. N'hesitez pas
                    a consulter le cours de comptabilite si vous souhaitez approfondir vos connaissances.
                </p>
            </div>
        </div>
    )
}
