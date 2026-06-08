export const communityProfiles = [
  {
    id: "leon",
    name: "Leon",
    previewImage: "/blechroute-app/community/leon-subaru-impreza-wrx-sti-01.webp",
    socials: {
      instagram: "",
      facebook: "",
      x: "",
      tiktok: "",
      youtube: "",
      website: ""
    },
    vehicles: [
      {
        id: "leon-subaru-impreza-wrx-sti",
        name: "Subaru Impreza WRX STI",
        images: [
          "/blechroute-app/community/leon-subaru-impreza-wrx-sti-01.webp"
        ]
      },
      {
        id: "leon-lexus-gs430",
        name: "Lexus GS 430",
        images: [
          "/blechroute-app/community/leon-lexus-gs400-01.webp",
          "/blechroute-app/community/leon-lexus-gs400-02.webp"
        ]
      }
    ]
  },
  {
    id: "nico",
    name: "Nico",
    previewImage: "/blechroute-app/community/nico-cupra-leon-st-01.webp",
    socials: {
      instagram: "",
      facebook: "",
      x: "",
      tiktok: "",
      youtube: "",
      website: ""
    },
    vehicles: [
      {
        id: "nico-cupra-leon-st",
        name: "Cupra Leon ST",
        images: [
          "/blechroute-app/community/nico-cupra-leon-st-01.webp",
          "/blechroute-app/community/nico-cupra-leon-st-02.webp"
        ]
      }
    ]
  },
  {
    id: "lance",
    name: "Lance",
    previewImage: "/blechroute-app/community/lance-ford-mondeo-01.webp",
    socials: {
      instagram: "",
      facebook: "",
      x: "",
      tiktok: "",
      youtube: "",
      website: ""
    },
    vehicles: [
      {
        id: "lance-ford-mondeo",
        name: "Ford Mondeo",
        images: [
          "/blechroute-app/community/lance-ford-mondeo-01.webp",
          "/blechroute-app/community/lance-ford-mondeo-02.webp"
        ]
      }
    ]
  },
  {
    id: "soenke",
    name: "Sönke",
    previewImage: "/blechroute-app/community/soenke-vw-golf-2-01.webp",
    socials: {
      instagram: "",
      facebook: "",
      x: "",
      tiktok: "",
      youtube: "",
      website: ""
    },
    vehicles: [
      {
        id: "soenke-vw-golf-2",
        name: "VW Golf 2",
        images: [
          "/blechroute-app/community/soenke-vw-golf-2-01.webp"
        ]
      }
    ]
  }
];

export function getCommunityProfileById(profileId) {
  return communityProfiles.find((profile) => profile.id === profileId) || null;
}

export function getCommunityStats() {
  const vehicleCount = communityProfiles.reduce((sum, profile) => {
    return sum + profile.vehicles.length;
  }, 0);

  const imageCount = communityProfiles.reduce((sum, profile) => {
    return sum + profile.vehicles.reduce((vehicleSum, vehicle) => {
      return vehicleSum + vehicle.images.length;
    }, 0);
  }, 0);

  return {
    profileCount: communityProfiles.length,
    vehicleCount,
    imageCount
  };
}
