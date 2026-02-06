import { DocDefinition } from "../../../components/document/docDefinition.tsx";
import { DocExample } from "../../../components/document/docExample.tsx";
import { DocLink } from "../../../components/document/docLink.tsx";
import { DocList } from "../../../components/document/docList.tsx";
import { DocNextPage } from "../../../components/document/docNextPage.tsx";
import { DocParagraph } from "../../../components/document/docParagraph.tsx";
import { DocSection } from "../../../components/document/docSection.tsx";
import { DocTable } from "../../../components/document/docTable.tsx";


export function ComptabiliteDocuments() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Les documents comptables</h1>
            <p className="text-neutral/50 mb-8">Les etats de synthese et leur signification</p>

            <DocSection title="Les documents de synthese">
                <DocParagraph>
                    A la fin de chaque exercice comptable, les ecritures sont agregees pour produire
                    des documents de synthese. Ces documents offrent une vision globale de la situation
                    financiere et des performances de l'organisation.
                </DocParagraph>
                <DocParagraph>
                    Les deux documents principaux sont le <strong>bilan</strong> et le{" "}
                    <strong>compte de resultat</strong>. Ils sont complementaires et se lisent ensemble.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le calcul du benefice">
                <DocParagraph>
                    Le benefice (ou la perte) d'une entreprise peut etre calcule de deux manieres
                    equivalentes, ce qui constitue un controle fondamental de la comptabilite :
                </DocParagraph>

                <DocDefinition
                    term="Par le patrimoine"
                    definition="Benefice = Patrimoine a la fin - Patrimoine au debut. Si l'entreprise possede plus a la fin qu'au debut, elle s'est enrichie."
                />
                <DocDefinition
                    term="Par les operations"
                    definition="Benefice = Produits - Charges. La somme de ce qu'on a gagne moins la somme de ce qu'on a depense."
                />

                <DocParagraph>
                    Ces deux calculs doivent donner le meme resultat. C'est la coherence entre
                    le bilan (patrimoine) et le compte de resultat (operations) qui garantit
                    l'exactitude de la comptabilite.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le bilan">
                <DocDefinition
                    term="Bilan"
                    definition="Photographie du patrimoine de l'organisation a une date donnee. Il montre ce que l'organisation possede (actif) et comment elle l'a finance (passif)."
                />

                <DocParagraph>
                    Le bilan est construit a partir des <strong>soldes des comptes d'agents</strong> :
                </DocParagraph>
                <DocList items={[
                    "Les soldes debiteurs forment l'actif (ce que les agents nous doivent : banque, clients...)",
                    "Les soldes crediteurs forment le passif (ce que nous devons aux agents : fournisseurs, Etat, proprietaires...)"
                ]} />

                <DocTable
                    headers={["ACTIF (ce que l'on a)", "PASSIF (comment c'est finance)"]}
                    rows={[
                        ["Actif immobilise (biens durables)", "Capitaux propres (apports, reserves, resultat)"],
                        ["Actif circulant (stocks, creances)", "Dettes (emprunts, fournisseurs)"],
                        ["Tresorerie (banque, caisse)", ""],
                    ]}
                />

                <DocParagraph>
                    L'equation fondamentale du bilan est : <strong>Actif = Passif + Resultat</strong>.
                    Le resultat vient equilibrer le bilan : un benefice augmente le passif (les capitaux propres),
                    une perte le diminue.
                </DocParagraph>

                <DocExample title="Lecture simplifiee d'un bilan">
                    <p>Une association presente le bilan suivant :</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <p className="font-medium">ACTIF</p>
                            <ul className="text-xs mt-1">
                                <li>Materiel informatique : 2 000</li>
                                <li>Banque : 5 000</li>
                                <li><strong>Total : 7 000</strong></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-medium">PASSIF</p>
                            <ul className="text-xs mt-1">
                                <li>Fonds associatifs : 6 000</li>
                                <li>Dettes fournisseurs : 1 000</li>
                                <li><strong>Total : 7 000</strong></li>
                            </ul>
                        </div>
                    </div>
                    <p className="mt-2 text-xs">L'association possede 7 000 euros de biens, finances par ses fonds propres et une dette.</p>
                </DocExample>
            </DocSection>

            <DocSection title="Le compte de resultat">
                <DocDefinition
                    term="Compte de resultat"
                    definition="Film de l'activite sur une periode. Il compare les produits (ce qu'on gagne) aux charges (ce qu'on depense) pour determiner le resultat (benefice ou perte)."
                />

                <DocParagraph>
                    Le compte de resultat est construit a partir des <strong>comptes d'operations</strong> (classes 6 et 7).
                    Il repond a la question : l'entreprise a-t-elle gagne ou perdu de l'argent sur la periode ?
                </DocParagraph>

                <DocList items={[
                    "Produits - Charges = Resultat",
                    "Si Produits > Charges : benefice (ou excedent pour une association)",
                    "Si Produits < Charges : perte (ou deficit)"
                ]} />

                <DocExample title="Compte de resultat simplifie">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium">CHARGES</p>
                            <ul className="text-xs mt-1">
                                <li>Achats : 3 000</li>
                                <li>Loyer : 6 000</li>
                                <li>Salaires : 20 000</li>
                                <li><strong>Total : 29 000</strong></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-medium">PRODUITS</p>
                            <ul className="text-xs mt-1">
                                <li>Ventes : 25 000</li>
                                <li>Subventions : 8 000</li>
                                <li><strong>Total : 33 000</strong></li>
                            </ul>
                        </div>
                    </div>
                    <p className="mt-2 font-medium">Resultat = 33 000 - 29 000 = 4 000 euros (benefice)</p>
                </DocExample>
            </DocSection>

            <DocSection title="Les capitaux propres">
                <DocParagraph>
                    Les capitaux propres representent ce que l'entreprise doit a ses proprietaires.
                    Ils comprennent plusieurs elements :
                </DocParagraph>

                <DocDefinition
                    term="Capital"
                    definition="Apports initiaux des associes ou fondateurs. Il reste generalement stable sauf augmentation ou reduction de capital."
                />
                <DocDefinition
                    term="Reserves"
                    definition="Benefices des annees passees qui ont ete conserves dans l'entreprise (non distribues aux associes)."
                />
                <DocDefinition
                    term="Report a nouveau"
                    definition="Resultat de l'exercice precedent en attente d'affectation (mise en reserve ou distribution)."
                />
                <DocDefinition
                    term="Resultat de l'exercice"
                    definition="Benefice ou perte de l'annee en cours, tel que calcule par le compte de resultat."
                />

                <DocExample title="Affectation du resultat">
                    <p>Une entreprise realise un benefice de 10 000 euros. Les associes decident :</p>
                    <ul className="mt-2 ml-4 text-sm">
                        <li>Distribution de dividendes : 4 000 euros (verses aux associes)</li>
                        <li>Mise en reserve : 6 000 euros (conserves dans l'entreprise)</li>
                    </ul>
                    <p className="mt-2 text-xs">Les reserves augmentent de 6 000 euros, renforcant les capitaux propres.</p>
                </DocExample>
            </DocSection>

            <DocSection title="La balance : document de controle">
                <DocDefinition
                    term="Balance"
                    definition="Liste de tous les comptes avec leur solde (debiteur ou crediteur). C'est l'outil de controle essentiel de la comptabilite."
                />

                <DocParagraph>
                    La balance verifie plusieurs equilibres :
                </DocParagraph>
                <DocList items={[
                    "Total des debits = Total des credits (principe de la partie double)",
                    "Total des soldes debiteurs = Total des soldes crediteurs",
                    "Les comptes d'actif ont generalement un solde debiteur",
                    "Les comptes de passif ont generalement un solde crediteur"
                ]} />

                <DocExample title="Extrait de balance">
                    <DocTable
                        headers={["Compte", "Intitule", "Debit", "Credit", "Solde"]}
                        rows={[
                            ["101", "Capital", "", "10 000", "10 000 Cr"],
                            ["411", "Clients", "5 000", "3 000", "2 000 Db"],
                            ["401", "Fournisseurs", "2 000", "4 000", "2 000 Cr"],
                            ["512", "Banque", "15 000", "8 000", "7 000 Db"],
                            ["606", "Achats fournitures", "1 000", "", "1 000 Db"],
                            ["706", "Prestations", "", "4 000", "4 000 Cr"],
                        ]}
                    />
                    <p className="mt-2 text-xs">Total debits = Total credits. La balance est equilibree.</p>
                </DocExample>
            </DocSection>

            <DocSection title="Les autres documents">
                <DocDefinition
                    term="Grand livre"
                    definition="Liste de tous les comptes avec le detail de leurs mouvements. Permet de verifier le detail de chaque compte."
                />
                <DocDefinition
                    term="Journal"
                    definition="Liste chronologique de toutes les ecritures passees. Permet de retrouver l'historique des operations."
                />
                <DocDefinition
                    term="Annexe"
                    definition="Document obligatoire qui complete le bilan et le compte de resultat avec des informations complementaires (methodes comptables, engagements hors bilan...)."
                />

                <DocParagraph>
                    Ces documents intermediaires sont utilises tout au long de l'annee pour controler
                    la comptabilite et preparer les documents de synthese.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le lien entre bilan et compte de resultat">
                <DocParagraph>
                    Le resultat du compte de resultat vient s'ajouter aux capitaux propres du bilan.
                    C'est ce qui fait le lien entre les deux documents :
                </DocParagraph>
                <DocList items={[
                    "Un benefice augmente les capitaux propres (l'organisation s'est enrichie)",
                    "Une perte diminue les capitaux propres (l'organisation s'est appauvrie)"
                ]} />

                <DocParagraph>
                    On peut aussi exprimer le resultat comme la variation du patrimoine net :
                </DocParagraph>
                <DocExample title="Verification par le patrimoine">
                    <p><strong>Resultat = Variation des creances - Variation des dettes</strong></p>
                    <p className="mt-2 text-sm">
                        Si les creances (ce qu'on possede) ont augmente de 5 000 euros et les dettes
                        de 2 000 euros, le resultat est de 3 000 euros : l'entreprise s'est enrichie de
                        la difference.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes genere automatiquement tous ces documents a partir de vos ecritures.
                    Consultez le guide sur les <DocLink to="/docs/guide/rapports">rapports</DocLink>{" "}
                    pour apprendre a generer et interpreter ces documents dans le logiciel.
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/docs/guide/demarrage"
                label="Guide : Demarrer avec Arrhes"
            />
        </div>
    )
}
