import requests
import re
import json
import random
from datetime import datetime

TARGET_URL = "https://coomer.st/onlyfans/user/audreyandsadie"
USER_ID = "audreyandsadie"

def get_captions():
    return [
        "Soft curves, loud energy 😍🔥",
        "Can’t look away 💦✨",
        "Too hot to scroll past 😈📸",
        "Feeling dangerous tonight 🖤🔥",
        "Just a little teaser for you 💋👀",
        "Electric vibes ⚡🔥",
        "Your new favorite view 🍑🔥",
        "Heavenly sent 😇✨",
        "Wild thoughts 💭😈",
        "Hot and ready 🌶️",
        "Diamond dreams 💎✨",
        "Secret garden 🌷🌿",
        "Lunar light 🌙✨",
        "Sweet & spicy 🍭🌶️",
        "Goddess energy 👑💎",
        "Satin skin 🎀✨",
        "Passion play 🎭🔥",
        "Lace & leather 🖤✨",
        "Fire & ice 🔥❄️",
        "Sugar high 🍭✨"
    ]

def scrape():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
    }
    
    try:
        response = requests.get(TARGET_URL, headers=headers, timeout=30)
        html = response.text
        
        # Extract basic info
        display_name = "Audrey and Sadie"
        bio = "Profile auto-generated from restricted source."
        
        # Find media URLs
        # Pattern for coomer data URLs
        media_pattern = r'https://img\.coomer\.st/data/[a-z0-9/]+\.(?:jpg|jpeg|png|webp|mp4|webm)'
        found_urls = re.findall(media_pattern, html)
        
        # Deduplicate
        found_urls = list(dict.fromkeys(found_urls))
        
        captions = get_captions()
        media_items = []
        
        for i, url in enumerate(found_urls):
            is_video = url.lower().endswith(('.mp4', '.webm'))
            
            # Convert to thumbnail if image
            final_url = url
            if not is_video:
                final_url = url.replace("/data/", "/thumbnail/data/")
            
            item = {
                "id": f"{USER_ID}-{i+1:03d}",
                "url": final_url,
                "thumbnailUrl": final_url if not is_video else url, # Simple fallback for video thumb
                "caption": random.choice(captions),
                "width": 800,
                "height": 1000,
                "isLocked": random.choice([True, False]),
                "isVisible": True,
                "mediaType": "video" if is_video else "image",
                "sourceUrl": final_url,
                "createdAt": datetime.now().isoformat() + "Z",
                "sha256": f"sha256-{USER_ID}-{i+1:03d}"
            }
            media_items.append(item)
            
        if not media_items:
            # Level 3 fallback
            print("No media found, using template-only fallback.")
            
        with open(f"services/{USER_ID}Data.json", "w") as f:
            json.dump(media_items, f, indent=2)
            
        print(f"Successfully scraped {len(media_items)} items.")
        return True
    except Exception as e:
        print(f"Scraping failed: {e}")
        return False

if __name__ == "__main__":
    scrape()
