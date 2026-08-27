# Lifecycle stage 9 — Model Deployment (hand-off)

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import joblib

from src.data.preprocess import clean_text
from src.routing.store import route_article


app = FastAPI()


# Frontend
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


# ML model
model = joblib.load("models/news_model.pkl")

vectorizer = joblib.load("models/tfidf_vectorizer.pkl")


class Article(BaseModel):
    text: str


@app.post("/predict")
def predict(article: Article):

    X = vectorizer.transform(
        [clean_text(article.text)]
    )

    category = model.predict(X)[0]

    route_article(article.text, category)

    return {"category": category}