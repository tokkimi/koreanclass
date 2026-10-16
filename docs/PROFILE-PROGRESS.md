# Progression accessible depuis le profil

- Les niveaux, les deux jauges, les leçons et les résultats ouvrent leur activité dans la langue concernée.
- Les tests affichent meilleur score, dernier score, nombre de tentatives et seuil de validation à 70 %.
- Un test interrompu conserve les réponses validées et la question courante sur le même navigateur/appareil. Les brouillons sont séparés par compte et invalidés si les exercices changent. Ils sont supprimés après une sauvegarde réussie du résultat.
- Les nouvelles tentatives enregistrent leurs réponses et une signature du contenu pour le bilan détaillé privé. Les anciennes tentatives restent lisibles avec leur score, sans inventer leurs réponses.
- Les six bilans coréens de tournures de phrases sont enregistrés dans la progression coréenne.

Vérification : 80 tests automatisés, compilation TypeScript/Vite, chargement des modules serveur avec Node ESM, profil mobile avec test validé/raté, bilan détaillé et reprise après actualisation via un serveur de test local sans compte de production.

## Source de référence

Cette version conserve les cinq langues, leurs cursus, les prix et Stripe, ainsi que les ateliers coréens de lecture et de phrases de la version déployée `7242e86`. Le commit GitHub `1782cdd` sauvegarde exactement son arbre de sources (`50076edf60b0b0809d6947c583141cf2f8f5da40`). Le profil a ensuite été intégré sur cette base dans `fix/home-from-live`. Comparer cette branche avant tout déploiement d'une ancienne branche.
