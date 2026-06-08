import { useMemo, useState } from "react";

import { communityProfiles } from "../data/communityProfiles";
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

function CommunityOverview({ onOpenProfile }) {
  return (
    <section className="community-page">
      <div className="community-hero">
        <p className="section-label">Community</p>
        <h2>Fahrer aus deiner Route</h2>
        <p>
          Profile, Garagen und Momente von Menschen, die Blechroute mit Leben
          füllen.
        </p>
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
              <small>
                {countImages(profile)} {countImages(profile) === 1 ? "Bild" : "Bilder"} ansehen
              </small>
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
        <p className="section-label">Garage</p>

        {profile.vehicles.map((vehicle) => (
          <article className="community-vehicle-card" key={vehicle.id}>
            <h3>{vehicle.name}</h3>

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

export default function CommunityPage() {
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const activeProfile = activeProfileId
    ? communityProfiles.find((profile) => profile.id === activeProfileId)
    : null;

  return (
    <>
      {activeProfile ? (
        <CommunityProfile
          profile={activeProfile}
          onBack={() => setActiveProfileId(null)}
          onOpenImage={setLightboxImage}
        />
      ) : (
        <CommunityOverview onOpenProfile={setActiveProfileId} />
      )}

      <CommunityLightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}
