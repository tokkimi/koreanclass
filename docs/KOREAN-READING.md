# Korean reading and sentence-building additions

Base: 294818a (the deployed multilingual site). Existing course content, pricing,
Stripe, the homepage and the four other language courses are preserved.

## Content and placement

- /coreen/tournures-de-phrases: six stages, 24 workshops, 96 original Korean
  examples with French and English explanations; six 12-question assessments.
- /coreen/lecture: six level readings and 26 original vocabulary-theme texts.
- Each Korean LessonStudio practice step and Korean SavedQuiz offers a collapsed
  reading/comprehension/translation activity. The precise lesson examples and
  vocabulary are reused; independent examples are described as such, not as a story.
- Korean level tests, placement results, alphabet, colours and scenarios offer
  reading follow-ups. Grammar workshops use the existing Korean LessonStudio.
- The shared components explicitly check the Korean lesson catalogue. Do not
  attach these readings to other-language lessons.

## Assessment and privacy

Reading QCMs have explained reference answers. Free summaries and translations
are compared to models rather than marked wrong merely for using other wording.
Korean translations recognise the existing normalisation rules but still allow
manual comparison with an alternative valid phrasing.

These supplementary activities do not change existing lesson/test scores,
badges or placement results. New sentence-test results last for the session.
Reading drafts are browser-local, versioned by content, and explicitly labelled
as not synced to the account. Recording uses MediaRecorder after a user click,
stops after 60 seconds and cleans up tracks and blob URLs; no upload or automatic
pronunciation score. Actual hardware capture depends on microphone permission
and browser/device support.

## Editorial references

Examples and passages were written for this site. Consult the National Institute
of Korean Language for grammatical contrasts, especially causal -아/어서 versus
-(으)니까 and the distinction from sequential -아/어서:
https://korean.go.kr/front/mcfaq/mcfaqView.do?mcfaq_seq=9195&mn_id=216&pageIndex=12
https://www.korean.go.kr/front/onlineQna/onlineQnaView.do?mn_id=261&pageIndex=1&qna_seq=314178

The TOPIK writing survey is explicitly fictional; comparisons use percentage
points, not relative percentage growth. These activities are not official TOPIK
exams and do not certify proficiency.

## Verification

75 automated tests pass, including content floors for all five languages and the
new Korean corpus coverage checks. Browser checks cover the 12-question special
test through its final result, QCM explanations, free summary, Korean translation,
local draft restoration, lesson integration, mobile overflow, and absence of
Korean navigation/panels on the Japanese course. Microphone capture itself was
not automated or granted on the user's behalf.
