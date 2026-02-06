import { DocDefinition } from "../../../components/document/docDefinition.tsx";
import { DocExample } from "../../../components/document/docExample.tsx";
import { DocLink } from "../../../components/document/docLink.tsx";
import { DocList } from "../../../components/document/docList.tsx";
import { DocNextPage } from "../../../components/document/docNextPage.tsx";
import { DocParagraph } from "../../../components/document/docParagraph.tsx";
import { DocSection } from "../../../components/document/docSection.tsx";
import { DocTable } from "../../../components/document/docTable.tsx";


export function ComptabiliteEcritures() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Les ecritures comptables</h1>
            <p className="text-neutral/50 mb-8">Enregistrer les operations dans les comptes</p>

            <DocSection title="Qu'est-ce qu'une ecriture comptable ?">
                <DocParagraph>
                    Une ecriture comptable est l'enregistrement d'une operation economique dans
                    les comptes. Chaque ecriture traduit un evenement reel (achat, vente, paiement...)
                    en langage comptable.
                </DocParagraph>
                <DocParagraph>
                    Comme vu dans l'<DocLink to="/docs/comptabilite/introduction">introduction</DocLink>,
                    chaque ecriture respecte le principe de la partie double : elle affecte au moins
                    deux comptes et le total des debits egale le total des credits.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le journal : registre chronologique">
                <DocParagraph>
                    Le <strong>journal</strong> est le document fondamental de la comptabilite. Il enregistre
                    toutes les ecritures dans l'ordre chronologique, creant ainsi une trace complete
                    et inalterable de l'activite de l'entreprise.
                </DocParagraph>
                <DocParagraph>
                    Le journal a une valeur juridique : il constitue une preuve en cas de litige
                    ou de controle fiscal. C'est pourquoi les ecritures ne doivent jamais etre effacees,
                    mais corrigees par des ecritures de contre-passation si necessaire.
                </DocParagraph>
            </DocSection>

            <DocSection title="Structure d'une ecriture">
                <DocParagraph>
                    Une ecriture comptable complete contient les elements suivants :
                </DocParagraph>
                <DocList items={[
                    "La date de l'operation",
                    "Le numero de piece justificative",
                    "Le libelle (description de l'operation)",
                    "Les comptes mouvementes avec leurs montants au debit ou au credit",
                    "Le journal dans lequel elle est enregistree"
                ]} />

                <DocExample title="Ecriture d'achat de fournitures">
                    <p className="font-medium mb-2">Achat de fournitures de bureau - 120 euros TTC paye par cheque</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["606100", "Fournitures de bureau", "100,00", ""],
                            ["445660", "TVA deductible", "20,00", ""],
                            ["512000", "Banque", "", "120,00"],
                        ]}
                    />
                    <p className="mt-2 text-xs">Total debit = Total credit = 120,00 euros</p>
                </DocExample>
            </DocSection>

            <DocSection title="Les journaux auxiliaires">
                <DocParagraph>
                    Pour faciliter l'organisation, les ecritures sont regroupees dans des journaux
                    auxiliaires selon leur nature. Cela permet de repartir le travail et de verifier
                    plus facilement les operations.
                </DocParagraph>

                <DocDefinition
                    term="Journal des achats (HA)"
                    definition="Enregistre toutes les factures fournisseurs recues. On y trouve les achats a credit avant leur reglement."
                />
                <DocDefinition
                    term="Journal des ventes (VE)"
                    definition="Enregistre toutes les factures clients emises. On y trouve les ventes a credit avant leur encaissement."
                />
                <DocDefinition
                    term="Journal de banque (BQ)"
                    definition="Enregistre tous les mouvements du compte bancaire : encaissements, decaissements, virements."
                />
                <DocDefinition
                    term="Journal de caisse (CA)"
                    definition="Enregistre tous les mouvements d'especes : recettes et depenses en liquide."
                />
                <DocDefinition
                    term="Journal des operations diverses (OD)"
                    definition="Enregistre les operations qui ne rentrent pas dans les autres journaux : salaires, amortissements, regularisations, ecritures de cloture."
                />
            </DocSection>

            <DocSection title="Operations a credit vs au comptant">
                <DocParagraph>
                    Une distinction importante existe entre les operations <strong>a credit</strong> (paiement differe)
                    et les operations <strong>au comptant</strong> (paiement immediat).
                </DocParagraph>

                <DocExample title="Achat a credit (deux ecritures)">
                    <p className="font-medium mb-2">1. Reception de la facture fournisseur (journal HA)</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["607000", "Achats de marchandises", "1 000,00", ""],
                            ["445660", "TVA deductible", "200,00", ""],
                            ["401000", "Fournisseurs", "", "1 200,00"],
                        ]}
                    />
                    <p className="mt-4 font-medium mb-2">2. Reglement de la facture (journal BQ)</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["401000", "Fournisseurs", "1 200,00", ""],
                            ["512000", "Banque", "", "1 200,00"],
                        ]}
                    />
                    <p className="mt-2 text-xs">La premiere ecriture cree la dette, la seconde l'eteint.</p>
                </DocExample>

                <DocExample title="Achat au comptant (une seule ecriture)">
                    <p className="font-medium mb-2">Achat paye immediatement par carte bancaire</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["607000", "Achats de marchandises", "1 000,00", ""],
                            ["445660", "TVA deductible", "200,00", ""],
                            ["512000", "Banque", "", "1 200,00"],
                        ]}
                    />
                    <p className="mt-2 text-xs">Pas de passage par le compte fournisseur car le paiement est immediat.</p>
                </DocExample>
            </DocSection>

            <DocSection title="Types d'operations courantes">
                <DocExample title="Vente a credit puis encaissement">
                    <p className="font-medium mb-2">1. Emission de la facture client (journal VE)</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["411000", "Clients", "600,00", ""],
                            ["706000", "Prestations de services", "", "500,00"],
                            ["445710", "TVA collectee", "", "100,00"],
                        ]}
                    />
                    <p className="mt-4 font-medium mb-2">2. Encaissement du client (journal BQ)</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["512000", "Banque", "600,00", ""],
                            ["411000", "Clients", "", "600,00"],
                        ]}
                    />
                </DocExample>

                <DocExample title="Reception d'une cotisation (association)">
                    <p>Un adherent paye sa cotisation annuelle de 50 euros en especes.</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["530000", "Caisse", "50,00", ""],
                            ["756000", "Cotisations", "", "50,00"],
                        ]}
                    />
                    <p className="mt-2 text-xs">La caisse augmente (debit), les produits augmentent (credit).</p>
                </DocExample>
            </DocSection>

            <DocSection title="La TVA dans les ecritures">
                <DocParagraph>
                    Si votre organisation est assujettie a la TVA, chaque operation doit distinguer
                    le montant hors taxes (HT) et la TVA. Le compte Etat joue un role central.
                </DocParagraph>

                <DocList items={[
                    "Sur les achats : la TVA payee est deductible (compte 4456) - l'Etat vous doit cette somme",
                    "Sur les ventes : la TVA facturee est collectee (compte 4457) - vous devez cette somme a l'Etat",
                    "La difference (collectee - deductible) est versee a l'Etat (ou remboursee si negative)"
                ]} />

                <DocExample title="Declaration de TVA">
                    <p className="mb-2">A la fin du mois, vous avez :</p>
                    <ul className="ml-4 text-sm">
                        <li>TVA collectee (4457) : 500 euros (crediteur)</li>
                        <li>TVA deductible (4456) : 300 euros (debiteur)</li>
                    </ul>
                    <p className="mt-2 font-medium">Ecriture de liquidation de TVA :</p>
                    <DocTable
                        headers={["Compte", "Libelle", "Debit", "Credit"]}
                        rows={[
                            ["445710", "TVA collectee", "500,00", ""],
                            ["445660", "TVA deductible", "", "300,00"],
                            ["445510", "TVA a decaisser", "", "200,00"],
                        ]}
                    />
                    <p className="mt-2 text-xs">Vous devez 200 euros a l'Etat (difference entre collectee et deductible).</p>
                </DocExample>
            </DocSection>

            <DocSection title="Controle des ecritures">
                <DocParagraph>
                    La <strong>balance</strong> permet de verifier que toutes les ecritures sont equilibrees.
                    Elle liste tous les comptes avec :
                </DocParagraph>
                <DocList items={[
                    "Le total des mouvements au debit",
                    "Le total des mouvements au credit",
                    "Le solde (debiteur ou crediteur)"
                ]} />
                <DocParagraph>
                    Si le total des debits n'egale pas le total des credits, c'est qu'une erreur
                    s'est glissee quelque part. La balance doit toujours etre equilibree.
                </DocParagraph>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Dans Arrhes, la <DocLink to="/docs/guide/ecritures">saisie des ecritures</DocLink>{" "}
                    est simplifiee. Le logiciel verifie automatiquement l'equilibre debit/credit
                    et vous guide dans le choix des comptes. Vous pouvez egalement creer des modeles
                    d'ecritures pour les operations repetitives.
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/docs/comptabilite/documents"
                label="Les documents comptables"
            />
        </div>
    )
}
