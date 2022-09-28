'use strict';

const path = require('path');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// see src/blendMode.js for available blend modes
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
// const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, '/build');
const layersDir = path.join(basePath, '/layers');

/*********************
 * General Generator Options
 ***********************/

const description =
  'This is the description of your NFT project, remember to replace this';
const baseUri = 'ipfs://NewUriToReplace';

const outputJPEG = false; // if false, the generator outputs png's

/**
 * Set your tokenID index start number.
 * ⚠️ Be sure it matches your smart contract!
 */
const startIndex = 0;

const WIDTH = 2048;
const ASPECT_RATIO = 5655 / 3859;

const format = {
  width: WIDTH,
  height: WIDTH * ASPECT_RATIO,
  smoothing: true, // set to false when up-scaling pixel art.
};

const background = {
  generate: false,
  brightness: '80%',
};

const TOTAL_COUNT = 11;

const WoC_SHARE = 0.3;
const Cou_SHARE = 0.25;
const DGu_SHARE = 0.2;
const AoE_SHARE = 0.15;
const BoU_SHARE = 0.09;
const GCA_SHARE = 0.01;

const WoC_COUNT = Math.floor(TOTAL_COUNT * WoC_SHARE); // 33
const Cou_COUNT = Math.floor(TOTAL_COUNT * Cou_SHARE); // 27
const DGu_COUNT = Math.floor(TOTAL_COUNT * DGu_SHARE); // 22
const AoE_COUNT = Math.floor(TOTAL_COUNT * AoE_SHARE); // 16
const BoU_COUNT = Math.floor(TOTAL_COUNT * BoU_SHARE); // 9
const GCA_COUNT = Math.floor(TOTAL_COUNT * GCA_SHARE); // 1

let currentCount = 0;
const REMAINING_COUNT = Math.max(
  0,
  TOTAL_COUNT -
    WoC_COUNT -
    Cou_COUNT -
    DGu_COUNT -
    AoE_COUNT -
    BoU_COUNT -
    GCA_COUNT,
);

console.log(
  'Generating\n',
  `  • ${WoC_COUNT + REMAINING_COUNT} for Workers Collective\n`,
  `  • ${Cou_COUNT} for Councillors\n`,
  `  • ${DGu_COUNT} for Design Guild\n`,
  `  • ${AoE_COUNT} for Association of Engineers\n`,
  `  • ${BoU_COUNT} for Brotherhood of Umbra\n`,
  `  • ${GCA_COUNT} for Global Corporate Alliance\n`,
);

const layerConfigurations = [
  {
    growEditionSizeTo: (currentCount += WoC_COUNT + REMAINING_COUNT),
    namePrefix: '*DAOHAUS',
    layersOrder: [
      { name: '__Background', options: { bypassDNA: true } },
      { name: 'Workers Collective' },
      { name: '__Number' },
      { name: '__Persona', trait: 'Persona' },
    ],
  },
  {
    growEditionSizeTo: (currentCount += Cou_COUNT),
    namePrefix: '*DAOHAUS',
    layersOrder: [
      { name: '__Background', options: { bypassDNA: true } },
      { name: 'Councillors' },
      { name: '__Number' },
      { name: '__Persona', trait: 'Persona' },
    ],
  },
  {
    growEditionSizeTo: (currentCount += DGu_COUNT),
    namePrefix: '*DAOHAUS',
    layersOrder: [
      { name: '__Background', options: { bypassDNA: true } },
      { name: 'Design Guild' },
      { name: '__Number' },
      { name: '__Persona', trait: 'Persona' },
    ],
  },
  {
    growEditionSizeTo: (currentCount += AoE_COUNT),
    namePrefix: '*DAOHAUS',
    layersOrder: [
      { name: '__Background', options: { bypassDNA: true } },
      { name: 'Association of Engineers' },
      { name: '__Number' },
      { name: '__Persona', trait: 'Persona' },
    ],
  },
  {
    growEditionSizeTo: (currentCount += BoU_COUNT),
    namePrefix: '*DAOHAUS',
    layersOrder: [
      { name: '__Background', options: { bypassDNA: true } },
      { name: 'Brotherhood of Umbra' },
      { name: '__Number' },
      { name: '__Persona', trait: 'Persona' },
    ],
  },
  {
    growEditionSizeTo: (currentCount += GCA_COUNT),
    namePrefix: '*DAOHAUS',
    layersOrder: [
      { name: '__Background', options: { bypassDNA: true } },
      { name: 'Global Corporate Alliance' },
      { name: '__Number' },
      { name: '__Persona', trait: 'Persona' },
    ],
  },
];

/**
 * Set to true for when using multiple layersOrder configuration
 * and you would like to shuffle all the artwork together
 */
const shuffleLayerConfigurations = true;

const debugLogs = true;

/*********************
 * Advanced Generator Options
 ***********************/

// if you use an empty/transparent file, set the name here.
const emptyLayerName = 'NONE';

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */
const incompatible = {
  //   Red: ["Dark Long"],
  //   // directory incompatible with directory example
  //   White: ["rare-Pink-Pompadour"],
};

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */
const forcedCombinations = {
  // floral: ["MetallicShades", "Golden Sakura"],
};

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  // Helmet: 'Space Helmet',
  // 'gold chain': 'GOLDEN NECKLACE',
};

const extraMetadata = {};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

// Outputs an Keccack256 hash for the image. Required for provenance hash
const hashImages = true;

const rarityDelimiter = '#';

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: 'preview.png',
};

const preview_gif = {
  numberOfImages: 5,
  order: 'ASC', // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: 'preview.gif',
};

module.exports = {
  background,
  baseUri,
  buildDir,
  debugLogs,
  description,
  emptyLayerName,
  extraAttributes,
  extraMetadata,
  forcedCombinations,
  format,
  hashImages,
  incompatible,
  layerConfigurations,
  layersDir,
  outputJPEG,
  preview,
  preview_gif,
  rarityDelimiter,
  shuffleLayerConfigurations,
  startIndex,
  traitValueOverrides,
  uniqueDnaTorrance,
  useRootTraitType,
};
