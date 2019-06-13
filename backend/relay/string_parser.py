from pythonosc.parsing import osc_types

original_get_string = osc_types.get_string
def get_string(dgram: bytes, start_index: int):
    offset = 0
    while dgram[start_index + offset] != 0:
        offset += 1
    if offset == 0:
        return '', 0
    return original_get_string(dgram, start_index)

def support_empty_strings():
    osc_types.get_string = get_string