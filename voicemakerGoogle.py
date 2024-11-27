from gtts import gTTS
import os

# Texto que quieres convertir en audio
text = "Hi, how can I help you?"

# Idioma (puedes usar 'en' para inglés, 'es' para español, etc.)
language = 'en'

# Crear el objeto de gTTS
tts = gTTS(text=text, lang=language, slow=False)

# Guardar el audio en un archivo
audio_file = "waitressMenuAudio.mp3"
tts.save(audio_file)

# Reproducir el audio (opcional, depende de tu sistema operativo)
os.system(f"start {audio_file}")  # En Windows
# os.system(f"open {audio_file}")  # En Mac
# os.system(f"xdg-open {audio_file}")  # En Linux

print(f"Archivo de audio generado: {audio_file}")
