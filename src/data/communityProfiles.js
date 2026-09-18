const basePath = import.meta.env.BASE_URL;
const asset = (path) => `${basePath}${path.replace(/^\//, "")}`;

export const communityProfiles = [
  {
    id: "leon",
    name: "Leon",
    handle: "@leon",
    previewImage: asset("community/leon-subaru-impreza-wrx-sti-01.webp"),
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
          asset("community/leon-subaru-impreza-wrx-sti-01.webp")
        ]
      },
      {
        id: "leon-lexus-gs430",
        name: "Lexus GS 430",
        images: [
          asset("community/leon-lexus-gs400-01.webp"),
          asset("community/leon-lexus-gs400-02.webp")
        ]
      }
    ]
  },
  {
    id: "nico",
    name: "Nico",
    handle: "@nico",
    previewImage: asset("community/nico-cupra-leon-st-01.webp"),
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
          asset("community/nico-cupra-leon-st-01.webp"),
          asset("community/nico-cupra-leon-st-02.webp")
        ]
      }
    ]
  },
  {
    id: "lance",
    name: "Lance",
    handle: "@lance",
    previewImage: asset("community/lance-ford-mondeo-01.webp"),
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
          asset("community/lance-ford-mondeo-01.webp"),
          asset("community/lance-ford-mondeo-02.webp")
        ]
      }
    ]
  },
  {
    id: "soenke",
    name: "Sönke",
    handle: "@soenke",
    previewImage: asset("community/soenke-vw-golf-2-01.webp"),
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
          asset("community/soenke-vw-golf-2-01.webp")
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
