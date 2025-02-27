use axum::{routing::{get, post}, Router};
use drveela::routes;
use tower_http::cors::CorsLayer;

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let router = Router::new()
    .route("/", get(routes::hello_world))
    .route("/drveela", post(routes::drveela))
    .layer(CorsLayer::permissive());

    Ok(router.into())
}