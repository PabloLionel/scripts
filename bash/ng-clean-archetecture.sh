#!/bin/bash

# Configuración de características y sus componentes
# Formato: "feature|tipo1:nombre1,nombre2|tipo2:nombre3"
# Tipos soportados: feature, ui, data, util, store (class), pipe, directive, enum, guard, interceptor, resolver

declare -A features=(
  # ["dashboard"]="feature:gyms-flow,gym-config-flow,gym-config-page|ui:gyms-table,gym-form,gym-config-form|data:gyms|store:gyms-flow,store:gym-flow"
  # ["login"]="feature:login-form|ui:login-button|data:auth|store:auth"
  # ["settings"]="feature:settings-page|ui:settings-panel|data:preferences"
)

# Función para generar componentes
generate_component() {
  local feature="$1"
  local type="$2"
  local name="$3"

  case "$type" in
    feature)
      echo "Generando feature component: $feature/feature/$name"
      pnpm ng g c "$feature/feature/$name" --flat # -d
      ;;
    ui)
      echo "Generando UI component: $feature/ui/$name"
      pnpm ng g c "$feature/ui/$name" # -d
      ;;
    pipe)
      echo "Generando UI pipe: $feature/ui/pipes/$name"
      pnpm ng g p "$feature/ui/pipes/$name" # -d
      ;;
    directive)
      echo "Generando UI directive: $feature/ui/directives/$name"
      pnpm ng g p "$feature/ui/directives/$name" # -d
      ;;
    data)
      echo "Generando data service: $feature/data/$name"
      pnpm ng g s "$feature/data/$name" # -d
      ;;
    util)
      echo "Generando utility: $feature/util/$name"
      pnpm ng g cl "$feature/util/$name" # -d
      ;;
    enum)
      echo "Generando constants: $feature/util/$name"
      pnpm ng g e "$feature/util/$name" # -d
      ;;
    guard)
      echo "Generando guard: $feature/util/$name"
      pnpm ng g g "$feature/util/$name" # -d
      ;;
    interceptor)
      echo "Generando interceptor: $feature/util/$name"
      pnpm ng g interceptor "$feature/util/$name" # -d
      ;;
    resolver)
      echo "Generando resolver: $feature/util/$name"
      pnpm ng g resolver "$feature/util/$name" # -d
      ;;
    store)
      echo "Generando store (class): $feature/feature/$name"
      pnpm ng g class "$feature/feature/$name" --type store # -d
      # pnpm ng g @ngrx/schematics:store --name "$name" --path "$feature/feature" -d --skip-tests
      ;;
    *)
      echo "Tipo no reconocido: $type"
      return 1
      ;;
  esac
}

# Procesar todas las features
for feature in "${!features[@]}"; do
  config="${features[$feature]}"

  # Dividir por | para obtener cada tipo de componente
  IFS='|' read -ra types <<< "$config"

  for type_config in "${types[@]}"; do
    # Dividir tipo y nombres: tipo:nombre1,nombre2
    IFS=':' read -ra parts <<< "$type_config"
    type="${parts[0]}"
    names="${parts[1]}"

    # Procesar cada nombre separado por coma
    IFS=',' read -ra name_array <<< "$names"
    for name in "${name_array[@]}"; do
      generate_component "$feature" "$type" "$name"
    done
  done
done

echo "✓ Generación completada"
