from watchmap_sdk import main


def test_message():
    assert main.message("Sonish") == "Hello Sonish!"
