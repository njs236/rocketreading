Title: Learning words
As a child
  I want to learn a word
  so that I will learn a word

Scenario: Learn word after timer finishes
  Given timer is over 8 secs
  when I select the Learn word button
  then it displays a word
  then correct word is announced 2 times
  then letters of word are shown in dotted letters
  then the word is announced again
  then a voice says a sentence containing particular word
  then a word in the sentence is shown on screen
  then the word disappears and speaks the word again
  When child selects correct word
  then correct word goes into piggy bank
  then no points awarded
  
Scenario: chooses incorrect word
  Given incorrect word
  Given timer is less than 8 secs
  when I select the Learn word button
  then it displays a word
  then correct word is announced 2 times
  then letters of word are shown in dotted letters
  then the word is announced again
  then a voice says a sentence containing particular word
  then a word in the sentence is shown on screen
  then the word disappears and speaks the word again
  When child selects correct word
  then correct word goes into piggy bank
  then no points awarded

Scenario: After the events attached to selecting the Learn Word is selected, selects incorrect word
  Given word is incorrect
  when Word is selected
  then repeat main flow

Scenario: After 2 attempts
  Given the word is incorrect
  when select the word
  then say "Lets go onto something else"
