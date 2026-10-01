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
