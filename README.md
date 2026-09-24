# Hangeul Club — cours de coréen en français

Site d'apprentissage du coréen pour francophones : 6 niveaux (Hangeul → A1 → … → C1-C2 / TOPIK 6), 43 leçons, 400+ exercices (QCM, textes à trous, associations, phrases à ordonner), tests de fin de niveau, test de positionnement, profils utilisateurs (photo, bio), tableau de bord de progression et réservation de cours particuliers (1 h = 15 €, pack 10 h = 100 €).

## Développement

```bash
npm install
npm run dev     # serveur local
npm test        # tests (contenu + correction)
npm run build   # build de production dans dist/
```

## Configuration (variables d'environnement Vercel)

| Variable | Rôle |
| --- | --- |
| `VITE_CONTACT_EMAIL` | E-mail qui reçoit les demandes de réservation (bouton « Envoyer la demande au professeur ») |
| `VITE_PAYMENT_LINK_SINGLE` | (optionnel) lien de paiement pour 1 h (Stripe Payment Link, PayPal.me…) |
| `VITE_PAYMENT_LINK_PACK` | (optionnel) lien de paiement pour le pack 10 h |

Redéployez après modification.

## Données

Les comptes, la progression et les réservations sont stockés dans le `localStorage` du navigateur (pas de serveur). Le contenu pédagogique est dans `src/data/level*.ts`.
