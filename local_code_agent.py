import requests
import os

# --- CONFIGURATION ---
OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "codellama:7b"
FOLDER_PATH = "."  # This points to the current folder (your website folder)

# --- READ EXISTING FILE ---
def read_file(file_path):
    with open(file_path, "r") as f:
        return f.read()

# --- WRITE TO NEW FILE ---
def write_file(file_path, content):
    with open(file_path, "w") as f:
        f.write(content)

# --- SEND PROMPT TO OLLAMA API ---
def send_to_ollama(prompt):
    response = requests.post(OLLAMA_API_URL, json={
        "model": MODEL_NAME,
        "prompt": prompt
    })
    return response.json()["response"]

# --- PROCESS EACH FILE ---
def process_file(file_path):
    file_content = read_file(file_path)
    print(f"\n🟢 Processing {file_path}...")

    # 🟡 ASK YOU FOR INSTRUCTIONS:
    user_instruction = input(f"What do you want to do with {file_path}? Type your request here:\n> ")

    # 🟢 BUILD THE PROMPT INCLUDING YOUR INPUT:
    prompt = f"""
Here is the content of my file `{os.path.basename(file_path)}`:
{file_content}

Your task: {user_instruction}

Please respond with the full updated code.
"""

    result = send_to_ollama(prompt)

    # --- Save the result to a new file ---
    output_path = file_path.replace(".html", "_updated.html") \
                           .replace(".js", "_updated.js") \
                           .replace(".css", "_updated.css")
    write_file(output_path, result)
    print(f"✅ Updated code written to: {output_path}")

# --- MAIN FUNCTION ---
def main():
    print("🟢 Local Code Assistant Started.")
    for filename in os.listdir(FOLDER_PATH):
        if filename.endswith((".html", ".css", ".js")):
            full_path = os.path.join(FOLDER_PATH, filename)
            process_file(full_path)
    print("✅ All done!")

if __name__ == "__main__":
    main()