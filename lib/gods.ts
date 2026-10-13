/**
 * -----------------------------------------------------------------------------
 * SMART GOLU / NAVARATHRI TALES — 8 ASHTA LAKSHMI CONFIGURATION
 * -----------------------------------------------------------------------------
 * Mapped to your high-resolution deity images in `frontend/public/images/`:
 * god 1.jpeg ... god 8.jpeg
 * -----------------------------------------------------------------------------
 */

export interface GodItem {
  id: number;
  name: string;
  tamilName: string;
  englishDesc: string;
  tamilDesc: string;
  imageUrl: string;
  accentColor?: string;
}

export const GODS_DATA: GodItem[] = [
  {
    id: 1,
    name: "Adi Lakshmi",
    tamilName: "ஆதி லட்சுமி",
    englishDesc:
      "Adi Lakshmi is the primordial form of Goddess Lakshmi, the source of all prosperity, peace and well-being.",
    tamilDesc:
      "ஆதி லட்சுமி என்பது லட்சுமியின் ஆதிரை வடிவம். இது அனைத்து செல்வம், அமைதி மற்றும் நலன்களின் மூலமாகும்.",
    imageUrl: "/images/god 1.jpeg",
    accentColor: "#D4AF37",
  },
  {
    id: 2,
    name: "Dhana Lakshmi",
    tamilName: "தன லட்சுமி",
    englishDesc:
      "Dhana Lakshmi brings wealth, prosperity and material abundance to those who are righteous and generous.",
    tamilDesc:
      "தன லட்சுமி செல்வம், வளம் மற்றும் பொருளாதார நலன்களை அருள்கிறார். தர்மம் மற்றும் தாரள மனம் உடையவர்களுக்கு.",
    imageUrl: "/images/god 2.jpeg",
    accentColor: "#E5C158",
  },
  {
    id: 3,
    name: "Dhanya Lakshmi",
    tamilName: "தானிய லட்சுமி",
    englishDesc:
      "Dhanya Lakshmi bestows food, agriculture and nourishment and harmony in life.",
    tamilDesc:
      "தானிய லட்சுமி உணவு, விவசாயம் மற்றும் வளமான வாழ்வை அருளுகிறார். அனைத்து உயிர்களுக்கும் பசியின்றி வாழ்கிறார்.",
    imageUrl: "/images/god 3.jpeg",
    accentColor: "#88C54D",
  },
  {
    id: 4,
    name: "Gaja Lakshmi",
    tamilName: "கஜ லட்சுமி",
    englishDesc:
      "Gaja Lakshmi brings royal grace, success and prosperity, removing obstacles and showering blessings.",
    tamilDesc:
      "கஜ லட்சுமி அரச மகிமை, வெற்றி மற்றும் செல்வத்தை அருள்புரிவார். தடைகளை நீக்கி ஆசீர்வாதங்களை வழங்குவார்.",
    imageUrl: "/images/god 4.jpeg",
    accentColor: "#D4AF37",
  },
  {
    id: 5,
    name: "Santana Lakshmi",
    tamilName: "சந்தான லட்சுமி",
    englishDesc:
      "Santana Lakshmi blesses with children, family happiness and the continuity of lineage and love.",
    tamilDesc:
      "சந்தான லட்சுமி பிள்ளைப் பேறு, குடும்ப இன்பம் மற்றும் வம்ச வளர்ச்சியை அருள்புரிவார்.",
    imageUrl: "/images/god 5.jpeg",
    accentColor: "#E28E4A",
  },
  {
    id: 6,
    name: "Veera Lakshmi",
    tamilName: "வீர லட்சுமி",
    englishDesc:
      "Veera Lakshmi imparts courage, strength and fearlessness to overcome challenges and protect what is right.",
    tamilDesc:
      "வீர லட்சுமி தைரியம், வலிமை மற்றும் அச்சமின்மையை அருள்புரிவார். சவால்களை சமாளித்து தர்மத்தை காக்க உதவுவார்.",
    imageUrl: "/images/god 6.jpeg",
    accentColor: "#D45244",
  },
  {
    id: 7,
    name: "Vijaya Lakshmi",
    tamilName: "விஜய லட்சுமி",
    englishDesc:
      "Vijaya Lakshmi brings success, achievement and victory in all endeavors, removing negativity and obstacles.",
    tamilDesc:
      "விஜய லட்சுமி எல்லா முயற்சிகளிலும் வெற்றி, சாதனை மற்றும் நலன்களை அருள்புரிவார். எதிர்மறையையும் தடைகளையும் நீக்குவார்.",
    imageUrl: "/images/god 7.jpeg",
    accentColor: "#2F9E66",
  },
  {
    id: 8,
    name: "Vidya Lakshmi",
    tamilName: "வித்தியா லட்சுமி",
    englishDesc:
      "Vidya Lakshmi bestows knowledge, wisdom and learning, lighting the path to a brighter future.",
    tamilDesc:
      "வித்தியா லட்சுமி அறிவு, ஞானம் மற்றும் கல்வியை அருள்புரிவார். ஒளிரும் எதிர்காலத்திற்கு வழிகாட்டுவார்.",
    imageUrl: "/images/god 8.jpeg",
    accentColor: "#58A4E5",
  },
];

export function getGodById(id: number | string): GodItem {
  const num = typeof id === "string" ? parseInt(id, 10) : id;
  const found = GODS_DATA.find((g) => g.id === num);
  return found || GODS_DATA[0];
}
