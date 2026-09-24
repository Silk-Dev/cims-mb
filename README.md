# CIMS Radiologie — site web

Site bilingue **français / arabe** du **Centre d’Imagerie Médicale Mongi Slim (CIMS Radiologie)**,
15 avenue Mongi Slim, 7050 Menzel Bourguiba (Bizerte) — Dr Riadh Ayari.

- **Next.js 16** (App Router) + **Payload CMS 3** intégré (admin sur `/admin`)
- **PostgreSQL**
- Français (`/fr`, LTR) et arabe (`/ar`, RTL), toutes les données sont traduisibles dans le CMS
- Tailwind CSS 4, Motion (animations), Lenis (défilement fluide)

## Pages

| URL | Contenu |
| --- | --- |
| `/fr`, `/ar` | Accueil : scanner (gantry) animé, chiffres clés, examens, section « rayons X » interactive, parcours patient |
| `/services` et `/services/<slug>` | Les 9 examens : description, points forts, indications, préparation |
| `/centre` | Le centre, l’équipe médicale, le plateau technique, plan d’accès |
| `/patients` | Documents à apporter, consignes par examen, FAQ |
| `/actualites` | Articles (brouillons / publication) |
| `/contact` | Formulaire de demande de rendez-vous (enregistré dans le CMS), téléphones, WhatsApp, carte |
| `/<slug>` | Pages libres construites avec des blocs (ex. `/fr/mentions-legales`) |

`/` redirige vers `/fr` ou `/ar` selon la langue du navigateur.

## Le CMS (`/admin`)

| Section | Ce qu’on y modifie |
| --- | --- |
| **Examens & Services** | Titre, résumé, description, points forts, indications, durée, jeûne, consignes, animation affichée, photo, ordre |
| **Pages libres** | Pages composées de blocs : texte, image + texte, grille d’examens, chiffres, FAQ, appel à l’action. Les pages `centre` et `patients` complètent les pages du même nom |
| **Actualités** | Articles avec brouillon / publication |
| **Équipe**, **Questions fréquentes** | Médecins et FAQ |
| **Demandes de rendez-vous** | Demandes envoyées depuis le site, avec statut (nouvelle, rappelé, planifié, annulé) |
| **Informations du centre** | Nom, adresse, téléphones, WhatsApp, e-mail, horaires, réseaux sociaux, SEO |
| **Page d’accueil** | Tous les textes de l’accueil |
| **Menus** | Liens du menu principal et du pied de page |

Le sélecteur **Locale** en haut de l’éditeur permet de passer du français à l’arabe.
Les pages publiques sont mises en cache et **rafraîchies automatiquement** à chaque enregistrement.

## Démarrage en local

Prérequis : Node 20.9+, pnpm, PostgreSQL.

```bash
cp .env.example .env          # renseigner DATABASE_URL et PAYLOAD_SECRET
pnpm install
pnpm dev                      # http://localhost:3000 — le schéma est synchronisé automatiquement en dev
SEED_ADMIN_EMAIL=vous@exemple.tn SEED_ADMIN_PASSWORD='…' pnpm seed   # contenu FR/AR + premier administrateur
```

Sans `SEED_ADMIN_*`, le premier compte se crée depuis `/admin`.

## Production

```bash
pnpm build        # ne nécessite pas de base de données
pnpm start        # applique automatiquement les migrations de src/migrations au démarrage
pnpm seed:prod    # (une fois) importe le contenu initial dans la base de production
```

- Ne lancez **jamais** `pnpm dev` ou `pnpm seed` sur la base de production : le mode dev synchronise le
  schéma directement et entre en conflit avec les migrations. Utilisez `pnpm seed:prod`.
- Après une modification des collections : `pnpm migrate:create <nom>` puis commit du fichier généré.
- Variables : `DATABASE_URL`, `PAYLOAD_SECRET`, `SITE_URL` (URL publique, pour le SEO et le sitemap).
- **Docker** : `PAYLOAD_SECRET=… POSTGRES_PASSWORD=… SITE_URL=https://… docker compose up -d --build`,
  puis `docker compose exec web pnpm seed:prod`.
- Les images envoyées dans le CMS sont stockées dans `media/` (volume Docker `media`). Sur un hébergement
  sans disque persistant (ex. Vercel), ajoutez un adaptateur de stockage Payload (S3, Vercel Blob…).
- Aucun envoi d’e-mail n’est configuré : les demandes de rendez-vous se consultent dans l’admin.
  Un adaptateur e-mail Payload (SMTP / Resend) peut être ajouté pour recevoir une notification.

## À vérifier avant la mise en ligne

- **Horaires d’ouverture** : ceux fournis sont indicatifs (non trouvés en ligne) → *Informations du centre*.
- **Radiologie interventionnelle** : ajoutée d’après le logo (« diagnostique & interventionnelle ») ; ajuster
  la liste des gestes réellement pratiqués.
- Consignes de préparation, FAQ, textes et biographie : contenus génériques rédigés pour le lancement, à faire
  relire par le Dr Ayari.
- Photos : aucune photo réelle n’est incluse ; les illustrations sont des animations vectorielles. Ajoutez des
  photos du centre et de l’équipe dans le CMS.
