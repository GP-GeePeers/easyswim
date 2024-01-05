from django import utils
import os
import zipfile

def descompactar_todos_lxf():
    # Caminhos dos Ficheiros. Se necessário pode ser alterado para a função receber os argumentos
    caminho_pasta_origem = 'media/lfx_files'
    caminho_pasta_destino = 'media/lef_files'

    # Garante que as pastas existem
    if not os.path.isdir(caminho_pasta_origem):
        raise FileNotFoundError(f"Pasta não encontrada: {caminho_pasta_origem}")
    if not os.path.isdir(caminho_pasta_destino):
        os.makedirs(caminho_pasta_destino)

    # Itera todos os arquivos .lxf na pasta 
    for arquivo in os.listdir(caminho_pasta_origem):
        if arquivo.endswith('.lxf'):
            caminho_completo_arquivo = os.path.join(caminho_pasta_origem, arquivo)
            nome_base = os.path.splitext(arquivo)[0]
            caminho_arquivo_destino = os.path.join(caminho_pasta_destino, nome_base + '.lef')

            # Descompacta o arquivo .lxf
            with zipfile.ZipFile(caminho_completo_arquivo, 'r') as zip_ref:
                zip_ref.extractall(caminho_pasta_destino)

            # Da Rename aos arquivos descompactados para a extensão .lef
            for arquivo_extraido in os.listdir(caminho_pasta_destino):
                if arquivo_extraido.startswith(nome_base):
                    os.rename(
                        os.path.join(caminho_pasta_destino, arquivo_extraido),
                        caminho_arquivo_destino
                    )
                    break



