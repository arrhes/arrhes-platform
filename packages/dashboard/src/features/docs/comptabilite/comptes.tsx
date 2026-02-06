import { DocDefinition } from "../../../components/document/docDefinition.tsx"
import { DocExample } from "../../../components/document/docExample.tsx"
import { DocLink } from "../../../components/document/docLink.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"


export function ComptabiliteComptes() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Les comptes comptables</h1>
            <p className="text-neutral/50 mb-8">Comprendre l'organisation du plan comptable</p>

            <DocSection title="Qu'est-ce qu'un compte ?">
                <DocParagraph>
                    Un compte est une categorie qui regroupe des operations de meme nature.
                    Chaque compte possede un numero et un intitule qui permettent de l'identifier.
                    Par exemple, le compte 512 - Banque regroupe toutes les operations
                    transitant par votre compte bancaire.
                </DocParagraph>
                <DocParagraph>
                    En France, les comptes sont organises selon le Plan Comptable General (PCG),
                    qui definit une structure commune a toutes les organisations.
                </DocParagraph>
            </DocSection>

            <DocSection title="Deux grandes familles de comptes">
                <DocParagraph>
                    Pour bien comprendre le fonctionnement des comptes, il est utile de distinguer
                    deux grandes familles : les <strong>comptes d'operations</strong> et les{" "}
                    <strong>comptes d'agents</strong>.
                </DocParagraph>

                <DocDefinition
                    term="Comptes d'operations"
                    definition="Ces comptes enregistrent les operations economiques du point de vue de l'entreprise : achats, ventes, charges, produits. Ils decrivent ce que fait l'entreprise."
                />
                <DocDefinition
                    term="Comptes d'agents"
                    definition="Ces comptes enregistrent les relations avec les tiers du point de vue de ces tiers : clients, fournisseurs, banque, caisse, Etat. Ils decrivent qui doit quoi a qui."
                />

                <DocExample title="Point de vue des comptes d'agents">
                    <p>Le compte Clients est tenu du point de vue des clients :</p>
                    <ul className="mt-2 ml-4 text-sm">
                        <li>Quand un client vous doit de l'argent - le compte est <strong>debite</strong> (sa dette augmente)</li>
                        <li>Quand il vous paye - le compte est <strong>credite</strong> (sa dette diminue)</li>
                    </ul>
                    <p className="mt-2">Le compte Fournisseurs est tenu du point de vue des fournisseurs :</p>
                    <ul className="mt-2 ml-4 text-sm">
                        <li>Quand vous leur devez de l'argent - le compte est <strong>credite</strong> (leur creance augmente)</li>
                        <li>Quand vous les payez - le compte est <strong>debite</strong> (leur creance diminue)</li>
                    </ul>
                </DocExample>

                <DocParagraph>
                    Cette distinction explique pourquoi les comptes d'actif (Banque, Caisse, Clients)
                    augmentent au debit, tandis que les comptes de passif (Fournisseurs, Capital)
                    augmentent au credit : on adopte toujours le point de vue de l'agent concerne.
                </DocParagraph>
            </DocSection>

            <DocSection title="Les classes de comptes">
                <DocParagraph>
                    Les comptes sont regroupes en 7 classes principales, numerotees de 1 a 7.
                    Le premier chiffre du numero de compte indique sa classe.
                </DocParagraph>

                <DocTable
                    headers={["Classe", "Intitule", "Type"]}
                    rows={[
                        ["1", "Comptes de capitaux", "Bilan (passif)"],
                        ["2", "Comptes d'immobilisations", "Bilan (actif)"],
                        ["3", "Comptes de stocks", "Bilan (actif)"],
                        ["4", "Comptes de tiers", "Bilan (actif ou passif)"],
                        ["5", "Comptes financiers", "Bilan (actif)"],
                        ["6", "Comptes de charges", "Resultat"],
                        ["7", "Comptes de produits", "Resultat"],
                    ]}
                />

                <DocParagraph>
                    Les classes 1 a 5 concernent le <strong>bilan</strong> (ce que vous possedez et ce que vous devez).
                    Les classes 6 et 7 concernent le <strong>compte de resultat</strong> (ce que vous depensez et ce que vous gagnez).
                </DocParagraph>
            </DocSection>

            <DocSection title="Les comptes de bilan (classes 1 a 5)">
                <DocDefinition
                    term="Classe 1 - Capitaux"
                    definition="Capital social, reserves, resultat de l'exercice, emprunts a long terme. Ce sont les ressources durables de l'organisation. Le capital est assimile a une dette envers les proprietaires."
                />
                <DocDefinition
                    term="Classe 2 - Immobilisations"
                    definition="Biens destines a rester durablement dans l'organisation : terrains, batiments, materiel, vehicules, logiciels..."
                />
                <DocDefinition
                    term="Classe 3 - Stocks"
                    definition="Marchandises, matieres premieres, produits finis en attente de vente ou d'utilisation."
                />
                <DocDefinition
                    term="Classe 4 - Tiers"
                    definition="Ce que l'on vous doit (clients, avances versees) et ce que vous devez (fournisseurs, dettes sociales et fiscales, TVA)."
                />
                <DocDefinition
                    term="Classe 5 - Financiers"
                    definition="Comptes bancaires, caisse, placements a court terme. Ces comptes sont tenus du point de vue de la banque ou de la caisse."
                />

                <DocExample title="Comptes de la classe 5">
                    <p>Voici quelques comptes financiers courants :</p>
                    <ul className="mt-2 ml-4">
                        <li>512 - Banque (compte courant)</li>
                        <li>530 - Caisse (especes)</li>
                        <li>531 - Caisse centrale</li>
                    </ul>
                    <p className="mt-2 text-sm text-neutral/70">
                        Le compte Banque est tenu du point de vue de la banque : quand elle vous doit
                        de l'argent (votre solde est positif), le compte est debiteur.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les comptes de gestion (classes 6 et 7)">
                <DocParagraph>
                    Les comptes de gestion sont des <strong>comptes d'operations</strong> : ils enregistrent
                    les flux economiques du point de vue de l'entreprise.
                </DocParagraph>

                <DocDefinition
                    term="Classe 6 - Charges"
                    definition="Toutes les depenses : achats, services exterieurs, impots, salaires, charges financieres... Une charge est debitee car elle represente un emploi de ressources."
                />
                <DocDefinition
                    term="Classe 7 - Produits"
                    definition="Toutes les recettes : ventes, prestations de services, subventions, produits financiers... Un produit est credite car il represente une ressource."
                />

                <DocExample title="Comptes courants de charges">
                    <ul className="ml-4">
                        <li>601 - Achats de matieres premieres</li>
                        <li>606 - Achats non stockes (fournitures)</li>
                        <li>613 - Locations</li>
                        <li>626 - Frais postaux et telecommunications</li>
                        <li>641 - Remunerations du personnel</li>
                    </ul>
                </DocExample>

                <DocExample title="Comptes courants de produits">
                    <ul className="ml-4">
                        <li>701 - Ventes de produits finis</li>
                        <li>706 - Prestations de services</li>
                        <li>740 - Subventions d'exploitation</li>
                        <li>756 - Cotisations (pour les associations)</li>
                    </ul>
                </DocExample>
            </DocSection>

            <DocSection title="Le compte Etat et la TVA">
                <DocParagraph>
                    L'Etat est traite comme un agent particulier avec plusieurs comptes dans la classe 4.
                    Pour la TVA, on distingue deux comptes principaux :
                </DocParagraph>

                <DocDefinition
                    term="4456 - TVA deductible"
                    definition="TVA payee sur les achats. L'Etat vous doit cette somme (ou vous pouvez la deduire de la TVA collectee). Le compte est debite quand la TVA deductible augmente."
                />
                <DocDefinition
                    term="4457 - TVA collectee"
                    definition="TVA facturee sur les ventes. Vous devez cette somme a l'Etat. Le compte est credite quand la TVA collectee augmente."
                />

                <DocExample title="Mecanisme de la TVA">
                    <p>A la fin de la periode :</p>
                    <ul className="mt-2 ml-4 text-sm">
                        <li>Si TVA collectee &gt; TVA deductible - vous devez la difference a l'Etat</li>
                        <li>Si TVA collectee &lt; TVA deductible - l'Etat vous doit la difference (credit de TVA)</li>
                    </ul>
                </DocExample>
            </DocSection>

            <DocSection title="Comment fonctionne un compte ?">
                <DocParagraph>
                    Selon le type de compte, les mouvements au debit et au credit ont des significations differentes :
                </DocParagraph>

                <DocTable
                    headers={["Type de compte", "Debit (+)", "Credit (-)"]}
                    rows={[
                        ["Actif (ce que vous avez)", "Augmentation", "Diminution"],
                        ["Passif (ce que vous devez)", "Diminution", "Augmentation"],
                        ["Charges (depenses)", "Augmentation", "Diminution"],
                        ["Produits (recettes)", "Diminution", "Augmentation"],
                    ]}
                />

                <DocExample title="Fonctionnement concret">
                    <p>Quand vous recevez de l'argent sur votre compte bancaire :</p>
                    <p className="mt-2">- Le compte 512 (Banque) est un compte d'actif</p>
                    <p>- Une augmentation se traduit par un <strong>debit</strong></p>
                    <p className="mt-2">Quand vous payez une facture depuis ce compte :</p>
                    <p className="mt-2">- Une diminution se traduit par un <strong>credit</strong></p>
                </DocExample>
            </DocSection>

            <DocSection title="Le journal et la balance">
                <DocParagraph>
                    Pour controler la comptabilite, deux documents sont essentiels :
                </DocParagraph>

                <DocDefinition
                    term="Le journal"
                    definition="Enregistrement chronologique de toutes les ecritures. Il permet de retracer l'historique des operations et constitue une preuve juridique."
                />
                <DocDefinition
                    term="La balance"
                    definition="Liste de tous les comptes avec leurs totaux debit, credit et solde. Elle permet de verifier l'equilibre global : le total des debits doit egaler le total des credits."
                />

                <DocParagraph>
                    La balance est un outil de controle indispensable : si elle n'est pas equilibree,
                    c'est qu'une erreur s'est glissee dans les ecritures.
                </DocParagraph>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Dans Arrhes, vous pouvez{" "}
                    <DocLink to="/docs/guide/organisations">configurer votre plan comptable</DocLink>{" "}
                    selon les besoins de votre organisation. Le logiciel propose un plan comptable
                    par defaut adapte aux entreprises et aux associations francaises, que vous pouvez
                    personnaliser.
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/docs/comptabilite/ecritures"
                label="Les ecritures comptables"
            />
        </div>
    )
}
