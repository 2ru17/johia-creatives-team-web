import { WriteupTone } from "@/store/useCreativesStore";

export interface WriteupTemplate {
  tone: WriteupTone;
  label: string;
  badge: string;
  author: string;
  targetAudience: string;
  caption: string;
  hashtags: string[];
}

export const WRITEUP_TEMPLATES: Record<WriteupTone, WriteupTemplate> = {
  JESUS_ON_THE_MOVE: {
    tone: "JESUS_ON_THE_MOVE",
    label: "Series: Jesus on the Move",
    badge: "SERMON SERIES // FAITH",
    author: "Documentation Branch // Editorial Desk",
    targetAudience: "Entire Church Family & Online Seekers",
    caption: `✨ Sunday Celebration | Jesus on the Move: God’s Endearing Face

When we seek His presence, we discover the depth of His grace. No matter what season you find yourself walking through, God's face is turned toward you with unfailing love and favor.

Join us this Sunday at 10:00 AM for worship, fellowship, and the Word!

📍 #15 Cambridge St, Cubao, Quezon City`,
    hashtags: ["#JOHIACubao", "#JesusOnTheMove", "#GodsEndearingFace", "#SundayCelebration", "#JesusOurHope"],
  },

  MORNING_PRAYER: {
    tone: "MORNING_PRAYER",
    label: "Devotional: Morning Prayer",
    badge: "INTERCESSION // PRAYER",
    author: "Documentation & Social Media Pod",
    targetAudience: "Prayer Partners & All Believers",
    caption: `📢 CALLING ALL PRAYER WARRIORS! 🙏🔥

Start your week anchored in God’s presence. Let us lift up our families, our church, and our community in prayer. There is power when the body of Christ gathers to intercede.

📖 “The prayer of a righteous person is powerful and effective.” - James 5:16

Join us in seeking God together! 💛`,
    hashtags: ["#JOHIACubao", "#MorningPrayer", "#PrayerWarriors", "#FaithInAction", "#JesusOurHope"],
  },

  THIS_IS_YOUR_HOME: {
    tone: "THIS_IS_YOUR_HOME",
    label: "Welcome Home: Sunday Service",
    badge: "COMMUNITY // SUNDAY SERVICE",
    author: "Social Media Branch // Content Team",
    targetAudience: "Visitors, Newcomers & Students",
    caption: `✨ Welcome Home! | Sunday Celebration 💛

At JOHIA Cubao, we believe in people loving God, people inspiring change, and people filled with hope. You are never alone, and there is always a place for you at the table.

Gather with us every Sunday at 10:00 AM as we celebrate who Jesus is in our lives! 🕊️`,
    hashtags: ["#JOHIACubao", "#ThisIsYourHome", "#SundayCelebration", "#PeopleLovingGod", "#JesusOurHope"],
  },

  CHURCH_ADVISORY: {
    tone: "CHURCH_ADVISORY",
    label: "Church Advisory: Community & Giving",
    badge: "ANNOUNCEMENT // COMMUNITY",
    author: "Editorial Desk // JOHIA Communications",
    targetAudience: "Church Members & Generous Partners",
    caption: `📢 Advisory from JOHIA Cubao

Thank you for your faithful partnership, continuous prayers, and generous hearts in blessing the community and expanding the Kingdom of God.

For official updates, online tithes, offerings, and ministry schedules, reach out to our team or message our page directly. God bless you abundantly!`,
    hashtags: ["#JOHIACubao", "#ChurchAdvisory", "#KingdomBuilders", "#Generosity", "#JesusOurHope"],
  },
};
