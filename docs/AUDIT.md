# Audit TalkToMe Club — octobre 2026

Base examinée : branche `claude/keen-euler-4oc1ph`, commit `8f68db6`. Les cinq langues (coréen, japonais, espagnol, anglais, français) ont été vérifiées dans le code et, pour les parcours principaux, dans le navigateur (téléphone 390 px et ordinateur 1280 px) avec des comptes de test simulés.

Légende : **OK** présente et fonctionnelle · **Incomplet** présente mais limitée · **Absent** · **Non vérifiable** (dépend d'un service externe ou de données réelles).

## 1. Contenus et niveaux

| Fonction | État | Constat | Fichiers / parcours |
|---|---|---|---|
| Cours structurés par niveau (6 niveaux, Pré-A1 → C1-C2) | OK | Coréen 110 leçons ; japonais, espagnol, anglais, français 112 leçons chacune. Chaque leçon a objectifs, sections, vocabulaire, exercices. | `src/data/level*.ts`, `src/data/courses/*` |
| Volume et relecture des contenus | Incomplet | Espagnol, anglais et français ont exactement les mêmes volumes (112 leçons, 1 588 exercices, 779 mots) : une grande partie est produite à partir de gabarits. Aucune relecture n'était enregistrée. | `src/data/courses/*-plus.ts`, `grammar-*.ts` |
| Dialogues | Incomplet | Présents dans 37 (coréen) à 52 (japonais) leçons sur ~110. | données de leçons |
| Correspondances CECRL / TOPIK / JLPT / DELE / Cambridge | OK, prudence | Indiquées par niveau ; les pages de test précisent que ce n'est pas un examen officiel. Correspondances indicatives, non validées par un organisme. | `Level.cefr`, `Level.topik`, `LevelTest.tsx`, `LangCourse.tsx` |
| Tests de fin de niveau | OK | 30 questions par niveau et par langue, notés côté serveur. | `server/progress.ts` |
| Test de positionnement | OK | 36 questions par langue, notées côté serveur, résultat par langue (`placement` pour le coréen, `placements[langue]` pour les autres). | `LangPlacement`, `Placement.tsx` |
| Vidéo pédagogique | Absent | Aucune vidéo de cours. Aucun onglet vidéo n'est affiché (conforme). | — |

## 2. Progression

| Fonction | État | Constat | Fichiers |
|---|---|---|---|
| Sauvegarde serveur, notation serveur, idempotence | OK | Sessions HttpOnly, notation côté serveur, `operationId`. | `api/account.ts`, `server/progress.ts` |
| Suivi séparé par langue | OK (corrigé) | Statistiques, badges et résultats filtrés par langue. **Corrigé** : le dénominateur « niveaux validés » utilisait toujours les 6 niveaux coréens (`levels.length`) ; le test de positionnement des autres langues (`p.placements`) était ignoré sur le tableau de bord et le profil ; « Refaire le test » renvoyait vers le test coréen. | `Dashboard.tsx`, `Profile.tsx` |
| XP, séries, badges | Incomplet | XP et série (streak) communs à toutes les langues. Les badges « Niveau N validé » se calculent par langue. | `src/lib/badges.ts` |
| Leçon consultée / exercice réussi / notion maîtrisée | Absent | Seul l'état « terminée (≥ 70 %) » existait. | — |
| Révisions espacées, flashcards, carnet d'erreurs | Absent | Rien ne programmait de révision. | — |

## 3. Oral

| Fonction | État | Constat | Fichiers |
|---|---|---|---|
| Studio oral (répétition, discours libre) | OK, avec un bug corrigé | Reconnaissance du navigateur (Web Speech), consentement micro, transcription enregistrée. **Corrigé** : la comparaison supprimait tous les caractères hors coréen/latin — en japonais une transcription quelconque obtenait 100 % ; les accents espagnols et français étaient ignorés. | `src/lib/oral.ts`, `OralPractice.tsx` |
| Nature du score | OK | Présenté comme « correspondance textuelle », pas comme une note phonétique (conforme). | `OralPractice.tsx` |
| Navigateur sans reconnaissance | Incomplet | Un message invite à changer de navigateur ; pas d'auto-évaluation enregistrée. | `OralPractice.tsx` |
| Mises en situation (scènes) | OK | Quiz de dialogue en 4 tours, notés côté serveur, par langue. | `Practice.tsx`, `LangPractice` |
| Écoute avant transcription, compréhension orale avec questions | Absent | Les dialogues sont toujours affichés avec leur texte. | — |

## 4. Réservations et paiements

| Fonction | État | Constat | Fichiers |
|---|---|---|---|
| Demande ≠ paiement ≠ crédit ≠ rendez-vous | OK | Demande enregistrée « demandée », paiement « à vérifier », crédits attribués uniquement par validation administrateur du paiement, rendez-vous confirmé séparément. | `api/account.ts`, `server/admin.ts` |
| Bulle « Réserver » | Corrigé | Proposait de payer directement sur PayPal sans demande ni référence (paiement impossible à rapprocher). Elle passe désormais par la demande de réservation. | `BookingBubble.tsx` |
| Fuseaux horaires | Corrigé | Les créneaux sont en heure de Paris, mais : rappels calculés dans le fuseau du visiteur, règle d'annulation à 24 h calculée en UTC avec une marge de 26 h, « aujourd'hui » calculé en UTC. Désormais conversion exacte heure de Paris (heure d'été comprise) et heure locale affichée pour les élèves hors de France (ex. La Réunion). | `src/lib/time.ts` |
| Disponibilités | Corrigé | Un élève pouvait demander un créneau déjà confirmé pour un autre élève ; créneaux passés acceptés par le serveur. Les créneaux confirmés sont maintenant affichés « indisponible » et refusés par le serveur, ainsi que les créneaux passés. | `api/account.ts`, `Booking.tsx` |
| Agenda élève, propositions du professeur, notifications | OK | — | `Bookings.tsx`, `AdminAgenda.tsx` |
| Paiement automatique (webhook) | Absent | Rapprochement PayPal manuel par l'administratrice, clairement décrit. | `Admin.tsx` |

## 5. Prix

| Point | État | Constat |
|---|---|---|
| Cohérence des prix | Corrigé | 15 € / 100 € étaient écrits en dur dans une dizaine d'endroits (accueil, pages langues, réservation, encarts après exercices, bulle, CGV, serveur, textes « 10 €/h · 50 € d'économie »). Source unique : `src/lib/pricing.ts` (affichage, liens PayPal calculés, montant attendu côté serveur, CGV). |
| Achats existants | Corrigé | Chaque paiement enregistre ses heures (`hours`) ; la validation crédite ces heures-là. Une hausse de prix future ne change pas un pack déjà commandé. Les anciens paiements sans `hours` sont traités comme avant (pack = 10 h). |
| Grille proposée (Découverte, Autonomie 9,90 €/mois, pack 130 €) | Proposition | Préparée dans `PROPOSED_PLANS`, **non achetable** : aucun abonnement récurrent ni gestion des droits n'existe. Les prix en vigueur restent 15 € et 100 €. |

## 6. Mobile

| Parcours | État |
|---|---|
| Barre du bas (langue, apprendre, jouer, progrès, profil), espace personnel à 4 onglets, admin avec barre dédiée | OK (vérifié 390 px) |
| Leçons longues d'un seul tenant | Incomplet — page très longue sur téléphone, pas de sommaire ni d'étapes. |

## 7. Fiabilité

Le stockage est un unique fichier JSON privé (Vercel Blob) réécrit à chaque opération avec contrôle ETag (6 tentatives). Il convient à un pilote de quelques centaines d'élèves actifs. Les révisions espacées et les notifications augmentent la taille par compte et le nombre d'écritures ; au-delà de ~500 élèves actifs simultanés ou avant d'ouvrir des abonnements, il faudra une base de données (Postgres / Neon, ou KV par compte).

---

# Livraison (octobre 2026)

## Ce qui a été réalisé et vérifié

| Étape | Fonction | Vérification |
|---|---|---|
| 1 | Prix centralisés (`src/lib/pricing.ts`), liens PayPal calculés, heures figées dans chaque paiement | tests serveur (crédits 9 h une seule fois, montants) |
| 1 | Heure de Paris exacte, heure locale affichée, créneaux confirmés / passés refusés | `time.test.ts` (été, hiver, La Réunion, Séoul) ; navigateur en fuseau Réunion |
| 1 | Positionnement et niveaux par langue sur le tableau de bord et le profil | navigateur (japonais) |
| 1 | Comparaison orale valable pour toutes les écritures | `oralScripts.test.ts` |
| 2 | Leçon en 5 étapes (Apprendre, Écouter, Pratiquer, Parler, Réviser), sommaire, reprise, précédent / suivant — pour les 5 langues | navigateur 390 px (japonais, coréen) |
| 2 | Flashcards texte + audio avec rappel actif (réponse tapée avant de retourner la carte) | navigateur |
| 2 | Répétition espacée calculée et enregistrée côté serveur (`progress.srs`), file du jour (mots les plus oubliés d'abord), prévision sur 7 jours | `srs.test.ts`, `learning.test.ts` |
| 2 | Carnet d'erreurs alimenté par la notation serveur des leçons et tests, reprise sans réponse visible, notation serveur | `learning.test.ts` (coréen, japonais, français) |
| 2 | Statuts distincts : consultée / exercices réussis / notion maîtrisée | `srs.test.ts` |
| 2 | Fiche imprimable (notions, vocabulaire, exemples, exercices, corrigé sur une page séparée) — `/fiche?lecon=…` | navigateur |
| 2 | Migration : champs facultatifs ; anciens profils inchangés ; bouton « ajouter les mots des leçons déjà réussies » | test de compatibilité |
| 3 | Tableau de bord : prochaine action, objectif du jour, difficultés, compétences réellement mesurées, suggestions selon l'objectif (voyage, quotidien, travail, examen) | navigateur |
| 3 | Écoute avant lecture, vitesse normale / lente, quiz de compréhension orale, répétition phrase par phrase, jeu de rôle, production personnelle ; auto-évaluation si le navigateur ne reconnaît pas la voix | navigateur |
| 5 | Signalement d'erreur relié à la leçon → onglet admin « Contenus » → réponse et notification à l'élève | test serveur, navigateur |
| 5 | Statut éditorial (brouillon / à relire / validé) ; badge « relu et validé » affiché seulement après validation enregistrée | test serveur |
| 5 | Bilan de séance et activités conseillées, avec difficultés et objectif de l'élève affichés au professeur | test serveur, navigateur |

## Ce qui dépend encore d'un service externe, d'un budget ou de contenus

| Élément | Dépendance | État actuel |
|---|---|---|
| Abonnement « Autonomie » (9,90 €/mois, 99 €/an) | Prestataire de paiement récurrent (PayPal Subscriptions ou Stripe Billing) avec webhook serveur, gestion des droits, renouvellements, résiliation, CGV mises à jour | Non achetable ; affiché seulement dans l'admin comme proposition |
| Pack à 130 € | Décision tarifaire (marge) | Prix en vigueur : 100 €. Changer `OFFERS.pack10.price` suffit ; les packs déjà commandés gardent leurs heures |
| Offre « Découverte » limitée | Choix des contenus gratuits ; nécessite l'abonnement pour avoir un sens | Tous les cours en autonomie restent gratuits |
| Confirmation automatique des paiements | Webhook PayPal/Stripe et clés serveur | Rapprochement manuel par l'administratrice (inchangé, fiable) |
| Tuteur IA | Service d'IA côté serveur (clé protégée), quotas, budget | **Non développé** : aucune fausse IA. À brancher dans une fonction serveur avec contexte de la leçon, indices avant réponse, quotas et désactivation propre |
| Note de prononciation | Service d'évaluation phonétique payant | Le site n'affiche qu'une correspondance textuelle, clairement présentée comme telle |
| Correction grammaticale automatique | Service externe | Non proposée (texte explicite dans l'étape Parler) |
| Vidéos pédagogiques | Production de contenus | Aucune ; aucun onglet vidéo |
| Relecture des leçons | Travail pédagogique humain (≈ 560 leçons) | Outil de statut prêt dans l'admin ; aucune leçon n'est marquée « validée » par défaut |
| Notifications hors du site (push, e-mail) | Service d'envoi (ex. Resend, Web Push + clés VAPID) | Notifications dans le site uniquement |
| Base de données | Au-delà d'un pilote (~500 élèves actifs) ou avant les abonnements | Fichier JSON unique (Vercel Blob) avec ETag ; migration vers Postgres recommandée |
| Reprise d'étape sur plusieurs appareils | Choix volontaire | La leçon consultée et la dernière activité sont sur le serveur ; l'étape précise (1 à 5) reste dans l'appareil pour limiter les écritures |
