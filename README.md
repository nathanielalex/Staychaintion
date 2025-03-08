<h1 align="center">
  <br>
  <a href="https://github.com/nathanielalex/Staychaintion"><img src="./src/public/Staychaintion_Logo_Final.png" alt="Staychaintion" width="200"></a>
  <br>
  	Staychaintion
  <br>
</h1>

<h4 align="center"> An innovative Web3-powered AI platform that redefines short-term property rentals built on top of <a href="https://internetcomputer.org/docs/current/motoko/tutorial" target="_blank">Internet Computer</a>.</h4>

StayChaintion is an innovative Web3-powered AI platform that redefines short-term property rentals through the power of blockchain, decentralization, and artificial intelligence. We offer secure, transparent, and AI-enhanced property management solutions that empower hosts and guests with a frictionless, trustless experience.


## 📚 Complete Documentation

<ul>
    <li><b>Notion Documentation (Detail)</b></li>
    https://www.notion.so/stanley-n-wijaya/StayChaintion-Documentation-1af73555b71f805a933ff1074e3e8059
    <li><b>Pitch Deck</b></li>
    https://www.canva.com/design/DAGgX6SkP8c/e9ZRfIfppA58yAfmVapf7w/edit?utm_content=DAGgX6SkP8c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
    <li><b>Demo Video</b></li>
    https://drive.google.com/file/d/1CnUGvAF6VMQLnUvK59eWFMMUCT3y4AsJ/view?usp=sharing
</ul>


## 🚩 Features
- ✅**Blockchain-Powered Transactions:**
    - Ensuring secure, transparent, and tamper-proof rental agreements.
- ✅**Decentralized Trust System:**
    - Utilizing smart contracts to eliminate intermediaries, reducing costs and increasing fairness for both hosts and guests.
- ✅**AI-Driven Smart Pricing & Insights:**
    - Predicting optimal rental prices based on location, room type, and room facility.
    - Get to know StayAI, the Staychaintion Chatbot that will help answer all questions related to Property, Web3, and AI.


You can see the following documentation for Internet Computer online:
- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)


## 📦 Packages
- Git
    - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- WSL
    - powershell > type in "wsl --install"
- Visual Studio Code https://code.visualstudio.com/ With the extensions :
    - Motoko Language
        - https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko
    - Remote WSL
        - https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
- Plug Connect
    - Extension
        - https://plugwallet.ooo/
    - Psychedelic packages
        - https://github.com/Psychedelic/plug-connect?tab=readme-ov-file

Make sure to have dfx installed, update if needed.
- DFX Version : 0.19.0

Also, make sure node is installed too.
- Node Version : 20

For more details, you can check the installation docs here:
<br>
https://docs.google.com/document/d/e/2PACX-1vTNicu-xuf4EiLAehHIqgfpjAnPjzqMGT-xpZVvYaAWNyvzYK_Ceve_me4PVRIxpzH7ea5PAX9NxGwY/pub


## 📜 Getting Started (WSL)
Finally, to get it running, you can follow these instructions :
Go to visual studio code and open a new terminal.

```
git clone https://github.com/nathanielalex/Staychaintion
cd staychaintion

npm install
dfx start --clean --background
dfx deps pull
dfx deps deploy

dfx canister call Property_seeder run
dfx canister stop Property_seeder
dfx canister call User_seeder run
dfx canister stop User_seeder

npm run setup
npm run start
```


## 🤖 AI Python Setup

**Installing Python in Ubuntu**
```
sudo apt update && sudo apt upgrade -y
sudo apt install python3 python3-pip -y
python3 --version   # Check Python version
pip3 --version      # Check Pip version
```
If the python and pip already installed then we are good to go

**Virtual Environment in Ubuntu**
```
cd ./staychaintion/ai-model
pip3 install virtualenv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip list # to check all installed dependencies
```


## 💸 AI Prediction Price
**Python & Notebook File Location**
```
cd staychaintion/ai-model/predictions/
```
**Created the AI Model**
<br>
The Model is already created by running the “train_model_final.py”
<br>
Simply just run that file to get the 3 .pkl file
```
python train_model_final.py
```
**Run the main_final.py python file**
<br>
Make sure you are in the same directory as where the main_final.py located
```
uvicorn main_final:app --host 0.0.0.0 --port 8000 --reload
```
That command will open the port to run the API and the frontend will fecth the API using Axios to get the response.


## 💸 StayAI Personalized Chatbot
**Get the Google API Key**

- Go to this website
    - https://aistudio.google.com/welcome?gad_source=1&gclid=Cj0KCQiA8q--BhDiARIsAP9tKI3gDrDyNbWKpyHs8tNWXDq0FJ2JSH3PcwEtBwCOyefT2immEViWAs0aArAQEALw_wcB
- Right there you need to get the Google API Key first
- After you already got the Google API Key, you can update the .env file located in ./staychaintion/.env (in the root folder)
- Put code like this
    - GOOGLE_API_KEY='YOUR_GOOGLE_API_KEY’


## 📧 Contact Information
If any questions occured, or in the need of any discussion or details,
please contact us :
- Email : stanley.n.wijaya7@gmail.com
- Telegram : https://t.me/xstynwx
- Discord : stynw7
