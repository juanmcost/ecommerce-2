{
  /* <Editable defaultValue="Take some chakra">
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Td isNumeric>{user.username}</Td> */
}

<Tbody>
  <Tr>
    <Th>Country</Th>
    <Editable defaultValue={user.country ? user.country : "ej Argentina"}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  </Tr>
  <Tr>
    <Th>City</Th>
    <Editable defaultValue={user.city ? user.city : "ej Buenos aires"}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  </Tr>

  <Tr>
    <Th>Direccion</Th>
    <Editable defaultValue={user.adress ? user.adress : "ej Calle falsa 123"}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  </Tr>
</Tbody>;
