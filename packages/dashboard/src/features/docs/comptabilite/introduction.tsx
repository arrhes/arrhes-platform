import { DocDefinition } from "../../../components/document/docDefinition.tsx";
import { DocExample } from "../../../components/document/docExample.tsx";
import { DocLink } from "../../../components/document/docLink.tsx";
import { DocList } from "../../../components/document/docList.tsx";
import { DocNextPage } from "../../../components/document/docNextPage.tsx";
import { DocParagraph } from "../../../components/document/docParagraph.tsx";
import { DocSection } from "../../../components/document/docSection.tsx";


export function ComptabiliteIntroduction() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Introduction a la comptabilite</h1>
            <p className="text-neutral/50 mb-8">Comprendre les fondamentaux de la comptabilite</p>

            <DocSection title="Qu'est-ce que la comptabilite ?">
                <DocParagraph>
                    La comptabilite est un systeme d'organisation de l'information financiere.
                    Elle permet d'enregistrer, classer et analyser toutes les operations economiques
                    d'une organisation (entreprise, association, etc.).
                </DocParagraph>
                <DocParagraph>
                    A l'origine, la comptabilite est nee du besoin de controler les mouvements d'argent
                    et de limiter les risques de detournement. Pour cela, seule une personne designee
                    (le caissier) est habilitee a percevoir et verser de l'argent, et toutes les operations
                    doivent etre justifiees par des pieces.
                </DocParagraph>
                <DocParagraph>
                    En termes simples, la comptabilite repond a deux questions essentielles :
                </DocParagraph>
                <DocList items={[
                    "D'ou vient l'argent ? (les ressources)",
                    "Ou va l'argent ? (les emplois)"
                ]} />
            </DocSection>

            <DocSection title="Pourquoi tenir une comptabilite ?">
                <DocParagraph>
                    La tenue d'une comptabilite est obligatoire pour la plupart des structures en France.
                    Au-dela de l'obligation legale, elle offre plusieurs avantages :
                </DocParagraph>
                <DocList items={[
                    "Connaitre la situation financiere de votre organisation a tout moment",
                    "Prendre des decisions eclairees basees sur des chiffres reels",
                    "Justifier vos operations aupres de l'administration fiscale",
                    "Calculer le benefice ou la perte de l'exercice",
                    "Communiquer avec vos partenaires (banques, fournisseurs, membres)"
                ]} />
            </DocSection>

            <DocSection title="L'exercice comptable">
                <DocParagraph>
                    Le temps est decoupe en periodes appelees <strong>exercices</strong>, generalement d'un an.
                    A la fin de chaque exercice, l'entreprise doit calculer son resultat (benefice ou perte)
                    et presenter ses comptes.
                </DocParagraph>
                <DocDefinition
                    term="Exercice comptable"
                    definition="Periode de 12 mois (generalement l'annee civile) pendant laquelle on enregistre les operations. A la fin de l'exercice, on etablit les documents de synthese (bilan, compte de resultat)."
                />
                <DocParagraph>
                    Le benefice de l'exercice est la difference entre le patrimoine de fin d'exercice
                    et le patrimoine initial. Si l'entreprise a reussi dans ses activites, elle dispose
                    a la fin de l'exercice d'un patrimoine superieur a celui du debut.
                </DocParagraph>
            </DocSection>

            <DocSection title="Les principes fondamentaux">
                <DocDefinition
                    term="Partie double"
                    definition="Chaque operation comptable affecte au moins deux comptes : l'un est debite, l'autre est credite. Le total des debits doit toujours etre egal au total des credits. Ce principe garantit l'equilibre de la comptabilite."
                />
                <DocDefinition
                    term="Piece justificative"
                    definition="Document qui prouve la realite d'une operation (facture, releve bancaire, ticket de caisse...). Chaque ecriture comptable doit etre justifiee par une piece. C'est le fondement du controle comptable."
                />
                <DocDefinition
                    term="Enregistrement chronologique"
                    definition="Les ecritures doivent etre passees regulierement dans l'ordre chronologique. Tout retour en arriere est impossible : les erreurs sont corrigees par des ecritures de sens contraire, jamais effacees."
                />

                <DocExample title="La partie double en action">
                    <p>Vous achetez des fournitures de bureau pour 100 euros en especes.</p>
                    <p className="mt-2">Cette operation se traduit par :</p>
                    <ul className="mt-1 ml-4">
                        <li>Debit du compte Fournitures : +100 euros (vous avez plus de fournitures)</li>
                        <li>Credit du compte Caisse : -100 euros (vous avez moins d'especes)</li>
                    </ul>
                    <p className="mt-2">Total debits = Total credits = 100 euros</p>
                </DocExample>
            </DocSection>

            <DocSection title="Vocabulaire essentiel">
                <DocDefinition
                    term="Debit"
                    definition="Cote gauche d'un compte. Le mot vient du latin debere (devoir) : il indique que le caissier doit pouvoir rendre l'argent entre dans sa caisse. Pour les comptes d'actif et de charges, un debit represente une augmentation."
                />
                <DocDefinition
                    term="Credit"
                    definition="Cote droit d'un compte. Le mot vient du latin credere (croire) : en echange d'une sortie d'argent, le caissier recoit une piece justificative qui lui permet d'etre cru lors d'un controle. Pour les comptes de passif et de produits, un credit represente une augmentation."
                />
                <DocDefinition
                    term="Solde"
                    definition="Difference entre le total des debits et le total des credits d'un compte. Un compte est debiteur si les debits sont superieurs aux credits, crediteur dans le cas contraire."
                />
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Ces concepts sont directement appliques dans Arrhes. Lorsque vous{" "}
                    <DocLink to="/docs/guide/ecritures">saisissez une ecriture</DocLink>,
                    le logiciel vous demande de specifier les comptes a debiter et a crediter,
                    et verifie automatiquement que l'equilibre est respecte.
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/docs/comptabilite/comptes"
                label="Les comptes comptables"
            />
        </div>
    )
}
