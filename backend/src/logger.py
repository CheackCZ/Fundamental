import logging

def setup_logger(log_file="./logs/debug.log", log_level=logging.DEBUG):
    logger = logging.getLogger("AuthService")
    if logger.hasHandlers():
        return logger
    
    logger.setLevel(log_level)
    formatter = logging.Formatter('[%(levelname)s] (%(asctime)s) - %(message)s')
    
    console_handler = logging.StreamHandler()
    console_handler.setLevel(log_level)
    console_handler.setFormatter(formatter)
    
    file_handler = logging.FileHandler(log_file, encoding="utf-8", mode='w')
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    
    return logger

logger = setup_logger()