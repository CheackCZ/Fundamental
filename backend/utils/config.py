import os
import re
from datetime import datetime
from dotenv import load_dotenv


class Config:
    """
    Validates and loads all required environment variables for the application. Ensures correct configuration settings.
    """

    def __init__(self):
        """
        Inititalizes the Config class and loads all required environment variables.
        """
        load_dotenv()

        self.LOG_LEVEL = self._validate_env_variable(var_name="LOG_LEVEL", allowed_values=['debug', 'info', 'warning', 'error', 'critical']) 
        self.FORMAT = self._validate_env_variable(var_name="FORMAT", allowed_values=['utf-8', 'ascii'])

        self.NEWS_API_KEY = self._validate_env_variable(var_name="NEWS_API_KEY")



    def _validate_env_variable(self, var_name, allowed_values=None):
        """
        Validates an environment variable to ensure it is present and optionally checks for allowed values.

        :param var_name (str): Name of the environment variable.
        :param allowed_values (list, optional): List of allowed values for the variable.

        :return: Validated environment variable value as a string.
        """
        value = os.getenv(var_name)
        if value is None:
            raise TypeError(f"[!] Missing required environment variable: {var_name}")
        
        if allowed_values and value.lower() not in allowed_values:
            raise ValueError(f"[!] Invalid value for {var_name}. Must be one of {allowed_values}.")

        return value

try:
    config = Config()
except (ValueError, TypeError, IOError) as e:
    print(e)
    exit(1)