import openai
import speech_recognition as sr
import pyttsx3

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Set your OpenAI API key
openai.api_key = 'your-openai-api-key'

def speak_text(text):
    """Convert text to speech."""
    engine.say(text)
    engine.runAndWait()

def get_audio():
    """Capture audio from the microphone and return it as text."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
        try:
            print("Recognizing...")
            text = recognizer.recognize_google(audio)
            print(f"You said: {text}")
            return text
        except sr.UnknownValueError:
            print("Sorry, I did not understand that.")
            return None
        except sr.RequestError:
            print("Sorry, my speech service is down.")
            return None

def chat_with_gpt(prompt):
    """Send a prompt to ChatGPT and return the response."""
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )
    return response.choices[0].text.strip()

def main():
    """Main function to run the voice interaction."""
    print("Say 'exit' to stop the program.")
    while True:
        user_input = get_audio()
        if user_input is None:
            continue
        if user_input.lower() == "exit":
            print("Exiting...")
            break
        response = chat_with_gpt(user_input)
        print(f"ChatGPT: {response}")
        speak_text(response)

if __name__ == "__main__":
    main()
