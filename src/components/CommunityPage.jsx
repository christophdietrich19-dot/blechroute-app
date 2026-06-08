import { useMemo, useState } from "react";

import { communityProfiles, getCommunityStats } from "../data/communityProfiles";
import "../styles/community.css";

function countVehicles(profile) {
  return profile.vehicles.length;
}

function countImages(profile) {
  return profile.vehicles.reduce((sum, vehicle) => {
    return sum + vehicle.images.length;
  }, 0);
}

function vehicleLine(profile) {
  return profile.vehicles.map((vehicle) => vehicle.name).join(" · ");
}

function hasSocialLinks(profile) {
  return Object.values(profile.socials || {}).some(Boolean);
}

function CommunityOverview({ onOpenProfile, onOpenMenu }) {
  const stats = getCommunityStats();

  return (
    <section className="community-page">
      <button
        className="community-back-button community-menu-button"
        type="button"
        onClick={onOpenMenu}
      >
        ← Menü
      </button>

      <div className="community-hero community-hero-card">
        <p className="section-label">Community</p>
        <h2>Garagen aus der Runde</h2>
        <p>
          Echte Profile, echte Autos und die Bilder dazu. Erstmal klein,
          aber genau hier wächst später die Blechroute-Community.
        </p>

        <div className="community-stats-row">
          <span>
            <strong>{stats.profileCount}</strong>
            Profile
          </span>
          <span>
            <strong>{stats.vehicleCount}</strong>
            Fahrzeuge
          </span>
          <span>
            <strong>{stats.imageCount}</strong>
            Bilder
          </span>
        </div>
      </div>

      <div className="community-profile-list">
        {communityProfiles.map((profile) => (
          <button
            className="community-profile-card"
            type="button"
            key={profile.id}
            onClick={() => onOpenProfile(profile.id)}
          >
            <div className="community-profile-preview">
              <img src={profile.previewImage} alt={`${profile.name} Vorschau`} />
            </div>

            <div className="community-profile-content">
              <span className="community-card-kicker">
                {countVehicles(profile)}{" "}
                {countVehicles(profile) === 1 ? "Fahrzeug" : "Fahrzeuge"}
              </span>
              <h3>{profile.name}</h3>
              <p>{vehicleLine(profile)}</p>

              <div className="community-mini-meta">
                <span>
                  {countImages(profile)} {countImages(profile) === 1 ? "Bild" : "Bilder"}
                </span>
                <span>Profil ansehen</span>
              </div>
            </div>

            <span className="community-card-arrow">›</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function CommunityProfile({ profile, onBack, onOpenImage }) {
  const socialLinks = useMemo(() => {
    if (!profile.socials) {
      return [];
    }

    return Object.entries(profile.socials).filter(([, value]) => Boolean(value));
  }, [profile]);

  return (
    <section className="community-page">
      <button className="community-back-button" type="button" onClick={onBack}>
        ← Community
      </button>

      <div className="community-profile-head">
        <img src={profile.previewImage} alt={`${profile.name} Profil`} />

        <div>
          <p className="section-label">Profil</p>
          <h2>{profile.name}</h2>
          <span>
            {countVehicles(profile)}{" "}
            {countVehicles(profile) === 1 ? "Fahrzeug" : "Fahrzeuge"} ·{" "}
            {countImages(profile)} {countImages(profile) === 1 ? "Bild" : "Bilder"}
          </span>
        </div>
      </div>

      {hasSocialLinks(profile) && (
        <div className="community-social-row">
          {socialLinks.map(([network, url]) => (
            <a key={network} href={url} target="_blank" rel="noreferrer">
              {network}
            </a>
          ))}
        </div>
      )}

      <div className="community-garage">
        <div className="community-section-title">
          <p className="section-label">Garage</p>
          <span>{profile.name}</span>
        </div>

        {profile.vehicles.map((vehicle) => (
          <article className="community-vehicle-card" key={vehicle.id}>
            <div className="community-vehicle-head">
              <h3>{vehicle.name}</h3>
              <span>
                {vehicle.images.length} {vehicle.images.length === 1 ? "Bild" : "Bilder"}
              </span>
            </div>

            <div className="community-polaroid-stack">
              {vehicle.images.map((image, index) => (
                <button
                  className={`community-polaroid community-polaroid-${index % 3}`}
                  type="button"
                  key={image}
                  onClick={() => onOpenImage(image)}
                >
                  <img src={image} alt={`${vehicle.name} Bild ${index + 1}`} />
                  <span>{profile.name}</span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommunityLightbox({ image, onClose }) {
  if (!image) {
    return null;
  }

  return (
    <div className="community-lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="community-lightbox-close" type="button" onClick={onClose}>
        ×
      </button>

      <img
        src={image}
        alt="Community Vollbild"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

export default function CommunityPage({ onOpenMenu }) {
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const activeProfile = activeProfileId
    ? communityProfiles.find((profile) => profile.id === activeProfileId)
    : null;

  return (
    <>
      <div className="screen-page community-screen-page">
        {activeProfile ? (
          <CommunityProfile
            profile={activeProfile}
            onBack={() => setActiveProfileId(null)}
            onOpenImage={setLightboxImage}
          />
        ) : (
          <CommunityOverview
            onOpenProfile={setActiveProfileId}
            onOpenMenu={onOpenMenu}
          />
        )}
      </div>

      <CommunityLightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}
