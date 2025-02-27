use axum::{extract::Json as RJson, response::Json};
use serde_json::Value;
use crate::drveela;

pub async fn hello_world() -> &'static str {"Access Denied"}

pub async fn drveela(RJson(params):RJson<Value>)->Json<serde_json::Value>{
    let info=drveela::start(params["sym"].to_string()).await;
    Json(serde_json::json!({"rp":info}))
}