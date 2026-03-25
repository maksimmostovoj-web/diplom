#!/bin/bash
cd /Users/maksimmostovoj/Downloads/Автотесты/diplom/tests
rm -rf allure-report
allure generate allure-results
java "-DconfigFile=notifications/telegram.json" -jar notifications/allure-notifications-4.11.0.jar