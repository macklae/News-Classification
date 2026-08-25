# News Classification — NLP & Machine Learning Pipeline

An end-to-end Natural Language Processing and machine-learning application that classifies news articles into categories such as Politics, Sports, Technology, Business and other topics.

The project combines text preprocessing, spaCy lemmatization, TF-IDF feature extraction and a Linear SVM classifier, with both command-line prediction and a FastAPI inference service.

## Project Overview

This project implements an end-to-end news classification pipeline using Natural Language Processing (NLP) and supervised machine learning.

The pipeline processes thousands of news articles through the following stages:

```text
Raw News Articles
        ↓
Data Ingestion
        ↓
Text Preprocessing
        ↓
spaCy Lemmatization
        ↓
Stop-word Removal
        ↓
TF-IDF Feature Extraction
        ↓
Linear SVM Classification
        ↓
Prediction
        ↓
Category Routing

```

The project supports both command-line predictions and a FastAPI inference service through a `/predict` endpoint.

The predicted category is also passed to a routing layer that places the article into the appropriate category feed for downstream applications such as search and personalization.

## Technology Stack

| Technology | Purpose |
|---|---|
| Python | Application and machine learning development |
| spaCy | NLP preprocessing and lemmatization |
| scikit-learn | Machine learning and evaluation |
| TF-IDF | Text feature extraction |
| Linear SVM | News classification |
| FastAPI | REST API inference service |
| Uvicorn | API server |

## Machine Learning Pipeline

### 1. Data Ingestion

The project ingests thousands of news articles from CSV datasets and prepares them for processing.

Raw datasets are stored under:

```text
data/raw/
```

### 2. Text Preprocessing

The news article text is cleaned and prepared for machine learning.

The preprocessing workflow includes:

- Text cleaning
- Stop-word removal
- spaCy lemmatization

Lemmatization converts words into their base form, helping reduce unnecessary variations in the vocabulary.

### 3. TF-IDF Feature Extraction

The cleaned text is converted into numerical feature vectors using TF-IDF (Term Frequency-Inverse Document Frequency).

This converts the text into numerical features that can be used by the machine-learning classifier.

The trained TF-IDF vectorizer is saved as:

```text
models/tfidf_vectorizer.pkl
```

### 4. Model Training

A Linear Support Vector Machine (Linear SVM) classifier is trained using the TF-IDF feature vectors.

The trained model is saved as:

```text
models/news_model.pkl
```

The trained model and TF-IDF vectorizer can then be loaded during prediction without requiring the model to be retrained.

## FastAPI Inference Service

The trained machine-learning pipeline is exposed through a FastAPI REST API.

### `POST /predict`

The `/predict` endpoint accepts a news article and returns its predicted category.

The inference flow is:

```text
News Article
      ↓
FastAPI /predict
      ↓
Text Preprocessing
      ↓
TF-IDF Vectorization
      ↓
Linear SVM
      ↓
Predicted Category
```

The API can be integrated with downstream news applications, search systems and recommendation engines.

### Swagger Documentation

When the FastAPI server is running:

```text
http://127.0.0.1:8000/docs
```


## Category Routing

The project includes a routing layer that uses the predicted news category to determine the appropriate category feed.

For example:

```text
News Article
      ↓
Linear SVM
      ↓
Technology
      ↓
Technology Category Feed
```

This provides a foundation for downstream functionality such as:

- Category-based news feeds
- Search
- Content discovery
- Personalization
- Recommendation systems

## Project Structure

```text
News_Classification/
│
├── data/
│   ├── raw/
│   └── processed/
│
├── models/
│   ├── tfidf_vectorizer.pkl
│   └── news_model.pkl
│
├── notebooks/
│
├── src/
│   ├── api/
│   │   └── app.py
│   │
│   ├── data/
│   │   ├── load_data.py
│   │   ├── preprocess.py
│   │   └── process_dataset.py
│   │
│   ├── features/
│   │   └── vectorizer.py
│   │
│   ├── models/
│   │   ├── build_model.py
│   │   ├── evaluate.py
│   │   ├── predict.py
│   │   └── train.py
│   │
│   └── routing/
│       └── store.py
│
├── main.py
├── requirements.txt
└── README.md
```

## Installation

### 1. Create a virtual environment

#### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### Windows

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Start the FastAPI server

```bash
uvicorn src.api.app:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

### Swagger Documentation

Interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

