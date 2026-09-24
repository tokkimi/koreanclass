import { SITE_NAME } from '../config'

export default function Privacy() {
  return (
    <div className="container page narrow">
      <div className="card prose">
        <h1>Confidentialité</h1>
        <p>
          {SITE_NAME} enregistre votre compte (nom, e-mail, photo de profil, bio), votre progression et vos réservations <strong>dans le stockage local de
          votre navigateur</strong> (localStorage). Ces données ne sont envoyées à aucun serveur.
        </p>
        <ul>
          <li>Votre mot de passe n'est jamais stocké en clair (empreinte SHA-256 salée).</li>
          <li>Vos données restent sur l'appareil et le navigateur utilisés : pensez à utiliser le même navigateur pour retrouver votre progression.</li>
          <li>Lorsque vous envoyez une demande de réservation, votre logiciel de messagerie transmet au professeur les informations affichées dans l'e-mail.</li>
          <li>Vous pouvez réinitialiser votre progression ou supprimer votre compte à tout moment depuis « Modifier le profil ».</li>
        </ul>
        <p>La prononciation audio utilise la synthèse vocale intégrée à votre appareil.</p>
      </div>
    </div>
  )
}
