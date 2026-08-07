import os
import re
import base64

log_dir = r'C:\Users\mohmed121\.gemini\antigravity\brain\2ba9394f-93be-4291-8498-8c8ac670013a\.system_generated\logs'
full_transcript = os.path.join(log_dir, 'transcript_full.jsonl')

with open(full_transcript, 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('data:image/jpeg;base64,')
if idx != -1:
    sub = text[idx + len('data:image/jpeg;base64,'):]
    # Find base64 characters only
    m = re.match(r'([A-Za-z0-9+/=\\n\\r]+)', sub)
    if m:
        raw_b64 = m.group(1).replace('\\n', '').replace('\\r', '').replace('\n', '').replace('\r', '').replace('\\', '')
        # Clean up any trailing non-base64 chars
        clean_b64 = re.sub(r'[^A-Za-z0-9+/]', '', raw_b64)
        missing_padding = len(clean_b64) % 4
        if missing_padding:
            clean_b64 += '=' * (4 - missing_padding)
        img_data = base64.b64decode(clean_b64)
        target_path = r'c:\Users\mohmed121\landingPage\choaa_lanfing_page\src\assets\card_image.jpg'
        os.makedirs(os.path.dirname(target_path), exist_ok=True)
        with open(target_path, 'wb') as out:
            out.write(img_data)
        print(f"Extracted image successfully! Size: {len(img_data)} bytes")
