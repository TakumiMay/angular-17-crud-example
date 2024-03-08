*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BASE_URL}            http://localhost:8081
${BROWSER}        Edge
${EDGE_DRIVER_PATH}    C:\\Program Files\\edgedriver_win64\\msedgedriver.exe

*** Test Cases ***
Add Tutorial Test
    [Documentation]    Test to add a new tutorial
    Open Browser    ${BASE_URL}    ${BROWSER}    executable_path=${EDGE_DRIVER_PATH}
    Maximize Browser Window
    Title Should Be    Angular17Crud
    Click Element    css=.btn.btn-sm.btn-danger
    Click Element    xpath=//a[contains(text(),'Add')]
    Wait Until Page Contains Element    name=title
    Input Text    name=title    New tutorial title
    Input Text    name=description    New tutorial description
    Click Element    css=button.btn.btn-success
    Wait Until Page Contains    Tutorial was submitted successfully!
    Click Element    xpath=//a[contains(text(),'Tutorials')]
    Input Text    css=input[placeholder="Search by title"]    New tutorial title
    Click Element    css=.btn.btn-outline-secondary
    Wait Until Page Contains    Tutorials List
    Click Element    xpath=//li[contains(text(),'New tutorial title')]
    Wait Until Page Contains Element    xpath=//div[contains(text(), 'New tutorial description')]

*** Keywords ***
Wait Until Page Contains
    [Arguments]    ${text}
    Wait Until Page Contains Element    xpath=//*[contains(text(),'${text}')]
