#!/bin/bash

# Lista de nombres de componentes
componentes=(
  # "components/carousel"
  # "components/product-list"
  # "components/checkout"
)

# Recorre cada nombre y genera el componente
for componente in "${componentes[@]}"
do
  echo "Generando componente: $componente"
  bunx ng generate component -c "OnPush" -v "None" "$componente"
done

# Lista de nombres de componentes
pages=(
  # "pages/NotFound"
)

# Recorre cada nombre y genera la pagina
for componente in "${pages[@]}"
do
  echo "Generando componente: $componente"
  bunx ng generate component -c "OnPush" -v "None" "$componente"
done

# Lista de nombres de componentes
directives=(
  # "directives/mount"
)

# Recorre cada nombre y genera la pagina
for directive in "${directives[@]}"
do
  echo "Generando directive: $directive"
  bunx ng generate component "$directive"
done

stores=(
  # "name=product|path=store"
  # "name=cart|path=store"
  # "name=category|path=store"
)

# Recorrer el array
for store in "${stores[@]}"; do
  # Separar campos usando IFS
  IFS='|' read -ra props <<< "$store"

  # Inicializar variables vacías
  name=""
  path=""

  # Extraer las propiedades
  for prop in "${props[@]}"; do
    IFS='=' read -r key value <<< "$prop"
    case "$key" in
      name) name="$value" ;;
      path) path="$value" ;;
    esac
  done

  # if [[ -z "$path" ]]; then # comprueba que path es vacio
  if [[ -n "$path" ]]; then # comprueba que path no es vacio
    bunx ng generate @ngxs/store:store --name "$name" --path "$path"
  else
    bunx ng generate @ngxs/store:store --name "$name"
  fi
  # Aquí podrías usar: ./mi_script.sh "$nombre" "$edad"
done
