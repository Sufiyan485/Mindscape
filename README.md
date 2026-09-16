# 🧠 Mindscape

> An end-to-end machine learning web application that predicts a student's mental health score based on academic, lifestyle, and social-media usage patterns.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Mindscape-2ea44f?style=for-the-badge)](https://mindscape-1-s2d6.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Sufiyan485/Mindscape)

---

## 🌐 Live Demo

**Try Mindscape:**  
[https://mindscape-1-s2d6.onrender.com/](https://mindscape-1-s2d6.onrender.com/)

Mindscape provides an interactive web interface where users can enter student information and receive a predicted mental health score.

> **Note:** The application is hosted on Render's free tier, so the first request after a period of inactivity may take longer while the backend service starts.

---

## 📌 About the Project

Mindscape is an end-to-end machine learning project built to explore the relationship between students' mental health scores and factors such as:

- Social-media usage
- Daily phone unlocks
- Study hours
- Physical activity
- Sleep duration
- Stress level
- Academic level
- Most-used platform
- Purpose of social-media use

The project covers the complete machine learning workflow, from exploratory data analysis and feature engineering to model training, API development, and cloud deployment.

> **Disclaimer:** This project is for educational purposes and is not a medical or diagnostic tool.

---

## ✨ Features

- 🧠 Predicts a student's mental health score
- 📊 Uses academic, lifestyle, and social-media features
- 🔄 Complete preprocessing pipeline
- 🤖 Multiple machine learning models evaluated
- 🌲 Random Forest selected as the best-performing model
- ⚡ FastAPI REST API
- 🌐 Interactive HTML/CSS/JavaScript frontend
- ✅ Input validation using Pydantic
- 🌍 Handles less-frequent countries using an `Other` category
- ☁️ Deployed frontend and backend using Render

---

## 🛠️ Tech Stack

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- Matplotlib
- Seaborn

### Backend

- FastAPI
- Pydantic
- Uvicorn

### Frontend

- HTML
- CSS
- JavaScript

### Deployment

- Render

---

## 📊 Dataset

The dataset contains **5,000 student records** and **13 columns**.

### Numerical Features

- `Age`
- `Avg_Daily_Usage_Hours`
- `Daily_Unlocks`
- `Study_Hours`
- `Physical_Activity_Hours`
- `Sleep_Hours_Per_Night`

### Categorical Features

- `Gender`
- `Country`
- `Academic_Level`
- `Most_Used_Platform`
- `Purpose_Of_Use`
- `Stress_Level`

### Target Variable

- `Mental_Health_Score`

The target variable represents the student's mental health score used for the regression task.

---

## 🔍 Exploratory Data Analysis

The dataset was explored before model training to understand distributions, relationships, categorical patterns, and potential data-quality issues.

The analysis included:

- Feature distributions
- Histograms
- Boxplots
- Scatterplots
- Correlation analysis
- Categorical feature distributions
- Mental health score across categorical groups
- Stress level analysis
- Social-media usage analysis
- Country distribution
- Outlier analysis
- Feature skewness

### Key Insights

A noticeable negative relationship was observed between **average daily social-media usage** and **mental health score** in the dataset.

Students with higher average daily usage tended to have lower mental health scores.

Stress level also showed a strong relationship with both social-media usage and mental health score.

| Stress Level | Avg. Mental Health Score | Avg. Daily Usage |
|:---|---:|---:|
| Low | 7.84 | 2.78 h |
| Medium | 7.14 | 3.86 h |
| High | 6.03 | 5.19 h |
| Very High | 5.05 | 6.87 h |

These findings describe patterns and associations present in the dataset. They **do not establish causation**.

---

## 🔬 Machine Learning Workflow

```text
Raw Dataset
     │
     ▼
Exploratory Data Analysis
     │
     ▼
Feature Engineering
     │
     ▼
Train / Test Split
     │
     ▼
Data Preprocessing
     │
     ▼
Model Training
     │
     ▼
Model Evaluation
     │
     ▼
Model Comparison
     │
     ▼
Best Model Selection
     │
     ▼
Save Complete Pipeline
     │
     ▼
FastAPI Backend
     │
     ▼
Web Application
     │
     ▼
Cloud Deployment (Render)
```

---

## ⚙️ Data Preprocessing

Different preprocessing techniques were applied according to feature type.

### Numerical Features

The numerical features were processed using:

- Median imputation
- StandardScaler

### Skewed Feature

`Study_Hours` showed mild positive skewness, so a `log1p` transformation was applied before scaling.

### Stress Level

`Stress_Level` is an ordinal feature, so it was encoded in the following order:

```text
Low → Medium → High → Very High
```

### Categorical Features

The remaining categorical features were processed using:

- Most-frequent imputation
- One-hot encoding
- `drop="first"`
- `handle_unknown="ignore"`

### Country Grouping

The dataset contained a large number of unique countries.

To reduce the number of categorical levels, the **top 10 countries** were retained while less-frequent countries were grouped into:

```text
Other
```

The top countries were determined using the training data to avoid data leakage.

### Preprocessing Pipeline

The preprocessing steps were combined using Scikit-learn's:

- `Pipeline`
- `ColumnTransformer`

This ensures that the same preprocessing logic used during training is applied when making predictions through the API.

---

## 🤖 Models Evaluated

Several regression models were trained and compared.

| Model | R² Score | MAE | MSE | RMSE |
|:---|---:|---:|---:|---:|
| Linear Regression | 0.7432 | 0.5303 | 0.4510 | 0.6716 |
| Ridge Regression | 0.7432 | 0.5303 | 0.4510 | 0.6716 |
| Lasso Regression | 0.7306 | 0.5481 | 0.4732 | 0.6879 |
| Random Forest | **0.8801** | **0.3418** | **0.2107** | **0.4590** |
| Tuned Random Forest | 0.8772 | 0.3460 | 0.2156 | 0.4644 |

### Evaluation Metrics

#### R² Score

R² measures how much of the variation in the target variable is explained by the model.

**Higher is better.**

#### MAE — Mean Absolute Error

MAE measures the average absolute difference between predicted and actual values.

**Lower is better.**

#### MSE — Mean Squared Error

MSE measures the average squared difference between predicted and actual values.

**Lower is better.**

#### RMSE — Root Mean Squared Error

RMSE is the square root of MSE and gives greater weight to larger prediction errors.

**Lower is better.**

---

## 🏆 Best Model

The **Random Forest Regressor** achieved the best performance on the test set.

### Test Performance

| Metric | Score |
|:---|---:|
| **R²** | **0.8801** |
| **MAE** | **0.3418** |
| **MSE** | **0.2107** |
| **RMSE** | **0.4590** |

The Random Forest model achieved a test R² of approximately **0.88**, meaning it explained a large portion of the variation in the target within this dataset.

The complete preprocessing and model pipeline was saved using Joblib:

```text
mental_health_model.pkl
```

Saving the complete pipeline ensures that new input data goes through the same preprocessing steps used during model training.

---

## 🔎 Model Selection

The Random Forest model was selected as the final model because it achieved the strongest performance across the main evaluation metrics.

Although a tuned Random Forest was also evaluated using `RandomizedSearchCV`, the original Random Forest performed slightly better on the held-out test set.

This highlights the importance of evaluating the final model on unseen test data rather than selecting a model only based on cross-validation performance.

---

## 🚀 Deployment

Mindscape uses separate frontend and backend deployments.

### Frontend

The frontend is deployed as a **Render Static Site**.

### Backend

The machine learning API is deployed as a **FastAPI Web Service on Render**.

### Deployment Architecture

```text
                         User
                           │
                           ▼
                ┌────────────────────┐
                │      Frontend      │
                │    HTML / CSS / JS │
                └─────────┬──────────┘
                          │
                          │ POST /predict
                          ▼
                ┌────────────────────┐
                │    FastAPI API     │
                │      Backend       │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Preprocessing +    │
                │ Random Forest      │
                │ Pipeline           │
                └─────────┬──────────┘
                          │
                          ▼
                    Prediction
```

### Live Services

**Frontend:**  
[https://mindscape-1-s2d6.onrender.com/](https://mindscape-1-s2d6.onrender.com/)

**Backend:**  
[https://mindscape-gjxu.onrender.com/](https://mindscape-gjxu.onrender.com/)

**API Documentation:**  
[https://mindscape-gjxu.onrender.com/docs](https://mindscape-gjxu.onrender.com/docs)

---

## 🔗 API

The backend is built using FastAPI.

### `GET /`

Returns a welcome message.

Example response:

```json
{
  "message": "Welcome to the Mental Health Prediction API!"
}
```

### `POST /predict`

Accepts student information and returns a predicted mental health score.

Example response:

```json
{
  "predicted_mental_health_score": 8.2
}
```

### API Documentation

Interactive Swagger documentation is available at:

[https://mindscape-gjxu.onrender.com/docs](https://mindscape-gjxu.onrender.com/docs)

---

## 📁 Project Structure

```text
Mindscape/
│
├── backend/
│   ├── main.py
│   ├── mental_health_model.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── api.js
│   └── app.js
│
├── data/
│   └── Students_mental_health.csv
│
├── notebooks/
│   └── Mental_health_predictor.ipynb
│
├── .gitignore
└── README.md
```

---

## 💻 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Sufiyan485/Mindscape.git
cd Mindscape
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment on Windows:

```bash
.venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Start the FastAPI Server

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### 4. Run the Frontend

Open the frontend using a local development server.

While developing locally, make sure `frontend/api.js` points to:

```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

For the deployed application, the API URL points to:

```javascript
const API_BASE_URL = "https://mindscape-gjxu.onrender.com";
```

---

## 🧪 Example Prediction

A successful API request returns a predicted mental health score.

Example:

```json
{
  "predicted_mental_health_score": 8.2
}
```

The prediction depends on the complete combination of input features rather than a single feature.

---

## ⚠️ Limitations

- The model is trained on a specific dataset and may not generalize to real-world populations.
- The dataset contains observational patterns, so relationships between variables should not be interpreted as causal.
- The model's prediction should not be treated as a clinical or psychological assessment.
- The application is intended for educational and demonstration purposes.
- The backend is hosted on Render's free tier, so the service may experience a cold-start delay after inactivity.

---

## ⚠️ Disclaimer

Mindscape is an **educational machine learning project**.

The predictions are generated from patterns learned from the provided dataset and **should not be considered medical advice, psychological assessment, or diagnosis**.

A student's mental health cannot be reliably determined from the features used in this project alone.

---

## 👨‍💻 Author

**Mohammed Sufiyan**

GitHub:  
[https://github.com/Sufiyan485](https://github.com/Sufiyan485)

---

## ⭐ Project

If you found this project interesting, feel free to explore the repository and try the live application.

**🌐 Live Demo:**  
[https://mindscape-1-s2d6.onrender.com/](https://mindscape-1-s2d6.onrender.com/)

**📂 Repository:**  
[https://github.com/Sufiyan485/Mindscape](https://github.com/Sufiyan485/Mindscape)