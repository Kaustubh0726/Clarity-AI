import os
import sys

try:
    import win32com.client
except ImportError:
    print("pywin32 not installed, attempting to install...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pywin32"])
    import win32com.client

try:
    ppt_app = win32com.client.Dispatch("PowerPoint.Application")
    # Make sure we use absolute paths
    base_dir = r"C:\Users\Poorva Pardeshi\.gemini\antigravity-ide\scratch\clarity-prototype"
    deck_path = os.path.join(base_dir, "Clarity_Slide_Deck.pptx")
    output_dir = os.path.join(base_dir, "slides_images")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    print(f"Opening deck: {deck_path}")
    # Open presentation (WithWindow=False runs it in the background)
    pres = ppt_app.Presentations.Open(deck_path, WithWindow=False)
    
    print("Exporting slides to PNG...")
    # ppSaveAsPNG is 18 in python-pptx / PowerPoint COM constants
    # (sometimes 17 or 18, let's use 18 for PNG)
    pres.SaveAs(os.path.join(output_dir, "slide"), 18)
    
    pres.Close()
    ppt_app.Quit()
    print(f"SUCCESS: Slides exported to {output_dir}")
except Exception as e:
    print(f"ERROR: {e}")
